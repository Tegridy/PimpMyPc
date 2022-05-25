import { Injectable } from '@angular/core';
import { BaseProduct } from '../../shared/model/BaseProduct';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../../shared/model/Cart';
import { environment } from '../../../environments/environment';
import { car, cart } from 'ionicons/icons';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = new Cart([], 0);

  private cartSource = new BehaviorSubject<Cart>(this.cart);
  currentCart = this.cartSource.asObservable();

  constructor() {}

  removeProductFromCart(id: number): void {
    const productIndex = this.cart.products.findIndex(
      (product) => product.id === id
    );
    this.cart.products.splice(productIndex, 1);
    this.calculateCartPrice();
  }

  addProductToCart(product: BaseProduct): void {
    if (!this.checkIfProductIsInCart(product.id)) {
      this.cart.products.push(product);
      this.calculateCartPrice();
    }
  }

  clearCart(): void {
    this.cart = new Cart([], 0);
    this.cartSource.next(this.cart);
  }

  calculateCartPrice(): void {
    if (this.cart.products.length > 0) {
      this.cart.totalPrice = this.cart.products
        .map((product) => product.price)
        .reduce((product1, product2) => product1 + product2);
    } else {
      this.cart.totalPrice = 0;
    }

    this.cartSource.next(this.cart);
  }

  checkIfProductIsInCart(productId: number): boolean {
    return !!this.cart.products.find((product) => product.id === productId);
  }
}
