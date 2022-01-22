import { BaseProduct } from './BaseProduct';
import { Product } from './Product';
import { ProductDetail } from './ProductDetail';
export interface Computer {
  motherboard: BaseProduct;
  processor: BaseProduct;
  ram: BaseProduct;
  powerSupply: BaseProduct;
  graphicCard: BaseProduct;
  case: BaseProduct;
}
