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

  public addProductToCart(product: BaseProduct): void {
    this.cart.products.push(product);
  }

  public removeProductFromCart(id: number): void {
    const productIdx = this.cart.products.findIndex((prod) => prod.id === id);
    this.cart.products.splice(productIdx, 1);
    this.cartSource.next(this.cart);
    this.updateCart();
  }

  changeCart(product: BaseProduct): void {
    this.addProductToCart(product);
    this.cartSource.next(this.cart);
    this.updateCart();
  }

  updateCart(): void {
    const y = this.cart.products.map((p) => p.id);

    this.http
      .post('http://localhost:8080/api/v1/cart/x', y)
      .subscribe((totalPrice) => {
        this.cart.cartTotalPrice = totalPrice as number;
      });
  }

  clearCart(): void {
    this.cart = new Cart([], 0);
    this.cartSource.next(this.cart);
  }
}
