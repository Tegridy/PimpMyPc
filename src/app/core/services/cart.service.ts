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

  constructor(private http: HttpClient) {}

  removeProductFromCart(id: number): void {
    const productIndex = this.cart.products.findIndex(
      (product) => product.id === id
    );
    this.cart.products.splice(productIndex, 1);
    this.updateCart();
  }

  addProductToCart(product: BaseProduct): void {
    this.cart.products.push(product);
    this.updateCart();
  }

  private updateCart(): void {
    const productsIndexes = this.cart.products.map((product) => product.id);

    this.http
      .put<Cart>(environment.API_URL + '/api/v1/cart', productsIndexes)
      .subscribe((c) => {
        this.cart.products = c.products;
        this.cart.totalPrice = c.totalPrice as number;
        this.cartSource.next(this.cart);
      });
  }

  clearCart(): void {
    this.cart = new Cart([], 0);
    this.cartSource.next(this.cart);
    this.updateCart();
  }
}
