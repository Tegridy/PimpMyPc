import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { BaseProduct } from '../../shared/model/BaseProduct';

@Component({
  selector: 'pmp-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  numberOfItemsInCart = 0;
  cartItems: BaseProduct[] = [];
  totalPrice = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.currentCart.subscribe((cart) => {
      this.cartItems = cart.products;
      this.numberOfItemsInCart = cart.products.length;
      this.totalPrice = cart.cartTotalPrice;
    });
  }

  removeProductFromCart(id: number): void {
    this.cartService.removeProductFromCart(id);
  }
}
