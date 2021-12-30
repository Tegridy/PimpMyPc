import {BaseProduct} from './BaseProduct';

export class Cart {
  products: BaseProduct[];
  cartTotalPrice: number;


  constructor(products: BaseProduct[], cartTotalPrice: number) {
    this.products = products;
    this.cartTotalPrice = cartTotalPrice;
  }
}
