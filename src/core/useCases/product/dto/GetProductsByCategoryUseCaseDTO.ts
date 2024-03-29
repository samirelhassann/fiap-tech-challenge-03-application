import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
import { Product } from "@/core/domain/entities/Product";

export interface GetProductsByCategoryUseCaseRequestDTO {
  params: PaginationParams;
  category: string;
}

export interface GetProductsByCategoryUseCaseResponseDTO {
  paginationResponse: PaginationResponse<Product>;
}
