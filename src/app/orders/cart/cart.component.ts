import {Component, OnInit} from '@angular/core';
import {CartService} from '../../core/services/cart.service';
import {BaseProduct} from '../../shared/model/BaseProduct';

@Component({
  selector: 'pmp-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  numberOfItemsInBasket = 0;
  basketItems: BaseProduct[] = [];
  basketItemsIds: number[] = [];
  totalPrice = 0;

  constructor(private cartService: CartService) {
    this.cartService.currentCart.subscribe(c => {
      this.basketItems = c.products;
      this.numberOfItemsInBasket = c.products.length;
      this.totalPrice = c.cartTotalPrice;
    });
  }

  ngOnInit(): void {
  }

  calculateTotalPrice(): number {
    return 0;
  }

  removeProductFromCart(id: number): void {
    this.cartService.removeProductFromCart(id);
  }
}
