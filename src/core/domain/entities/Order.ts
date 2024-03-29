/* eslint-disable import/no-cycle */

import { AggregateRoot } from "../base/entities/AggregateRoot";
import { UniqueEntityId } from "../base/entities/UniqueEntityId";
import { Optional } from "../base/types/Optional";
import { UpdatedOrderStatusEvent } from "../events/UpdatedOrderStatusEvent";
import { OrderStatus } from "../valueObjects/OrderStatus";
import { PaymentMethod } from "../valueObjects/PaymentMethod";
import { OrderComboItemList } from "./OrderComboItemList";
import { User } from "./User";

export interface OrderProps {
  status: OrderStatus;
  number: bigint;
  totalPrice: number;
  createdAt: Date;
  userId?: UniqueEntityId;
  visitorName?: string;
  updatedAt?: Date;
  paymentMethod: PaymentMethod;
  paymentDetails?: string;
  combos: OrderComboItemList;
  user?: User;
}

export class Order extends AggregateRoot<OrderProps> {
  constructor(
    props: Optional<OrderProps, "createdAt" | "combos" | "number">,
    id?: UniqueEntityId
  ) {
    super(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        combos: props.combos ?? new OrderComboItemList(),
        number: props.number ?? BigInt(0),
      },
      id
    );

    const isNewAnswer = !id;

    if (isNewAnswer) {
      this.addDomainEvent(new UpdatedOrderStatusEvent(this));
    }
  }

  get status() {
    return this.props.status;
  }

  set status(value: OrderStatus) {
    this.props.status.name = value.name;

    this.addDomainEvent(new UpdatedOrderStatusEvent(this));

    this.touch();
  }

  get number() {
    return this.props.number;
  }

  get totalPrice() {
    return this.props.totalPrice;
  }

  get userId() {
    return this.props.userId;
  }

  get visitorName() {
    return this.props.visitorName;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get combos() {
    return this.props.combos;
  }

  set combos(value: OrderComboItemList) {
    this.props.combos = value;
    this.touch();
  }

  get paymentMethod() {
    return this.props.paymentMethod;
  }

  get paymentDetails() {
    return this.props.paymentDetails;
  }

  set paymentDetails(value: string | undefined) {
    this.props.paymentDetails = value;
    this.touch();
  }

  get user() {
    return this.props.user;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
}
