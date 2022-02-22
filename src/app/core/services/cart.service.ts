import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BaseProduct } from '../../shared/model/BaseProduct';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../../shared/model/Cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: Cart = new Cart([], 0);

  private cartSource = new BehaviorSubject<Cart>(this.cart);
  currentCart = this.cartSource.asObservable();

  constructor(private http: HttpClient) {}

  addProductToCart(product: BaseProduct): void {
    this.cart.products.push(product);
  }

  removeProductFromCart(id: number): void {
    const productIndex = this.cart.products.findIndex(
      (product) => product.id === id
    );
    this.cart.products.splice(productIndex, 1);
    this.updateCart();
  }

  changeCart(product: BaseProduct): void {
    this.addProductToCart(product);
    this.updateCart();
  }

  private updateCart(): void {
    const productsIndexes = this.cart.products.map((product) => product.id);

    this.http
      .put('http://localhost:8080/api/v1/cart', productsIndexes)
      .subscribe((totalPrice) => {
        this.cart.cartTotalPrice = totalPrice as number;

        this.cartSource.next(this.cart);
      });
  }

  clearCart(): void {
    this.cart = new Cart([], 0);
    this.cartSource.next(this.cart);
  }
}
