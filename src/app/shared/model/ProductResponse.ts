import { BaseProduct } from './BaseProduct';
export interface ProductResponse {
    products: BaseProduct[];
    currentPage: number;
    productsCount: number;
}