import {Injectable} from '@angular/core';
import {BaseProduct} from '../../shared/model/BaseProduct';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSource = new BehaviorSubject<BaseProduct[]>([]);
  currentCart = this.cartSource.asObservable();
  private totalPriceSource = new BehaviorSubject<number>(0);
  totalPrice = this.totalPriceSource.asObservable();

  productsInCart: BaseProduct[] = [];


  constructor(private http: HttpClient) {
  }

  public addProductToCart(product: BaseProduct): void {
    this.productsInCart.push(product);
  }

  public removeProductFromCart(id: number): void {
    const productIdx = this.productsInCart.findIndex(prod => prod.id === id);
    this.productsInCart.splice(productIdx, 1);
    this.cartSource.next(this.productsInCart);
    this.updateCart();
  }

  changeCart(product: BaseProduct): void {
    this.addProductToCart(product);
    this.cartSource.next(this.productsInCart);
    this.updateCart();
  }

  updateCart(): void {
    const y = this.productsInCart.map(p => p.id);

    this.http.post('http://localhost:8080/api/v1/cart/x', y).subscribe(
      totalPrice => {
        this.totalPriceSource.next(totalPrice as number);
      });

  }
}
