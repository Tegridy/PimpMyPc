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
      this.basketItems = c;
      console.log(this.cartService.totalPrice);
      this.numberOfItemsInBasket = c.length;
    });

    this.cartService.totalPrice.subscribe(totalPrice => this.totalPrice = totalPrice);
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
