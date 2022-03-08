import { BaseProduct } from 'src/app/shared/model/BaseProduct';
export interface ProductResponse {
  products: ProductDto;
  filters?: any;
}

export interface ProductDto {
  number: number;
  totalElements: number;
  content: BaseProduct[];
}
