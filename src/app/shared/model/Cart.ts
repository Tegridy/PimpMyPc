import { BaseProduct } from './BaseProduct';

export class Cart {
  products: BaseProduct[];
  totalPrice: number;

  constructor(products: BaseProduct[], totalPrice: number) {
    this.products = products;
    this.totalPrice = totalPrice;
  }
}
