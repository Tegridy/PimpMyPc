export interface ProductResponse {
  products: ProductsDto;
  filters: any;
}

export interface ProductsDto {
  id: number;
  title: string;
  number: number;
  totalElements: number;
  content: any[];
}
