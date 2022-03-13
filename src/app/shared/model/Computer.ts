import {BaseProduct} from './BaseProduct';

export interface Computer {
  motherboard: BaseProduct;
  processor: BaseProduct;
  ram: BaseProduct;
  powerSupply: BaseProduct;
  graphicCard: BaseProduct;
  case: BaseProduct;
}
