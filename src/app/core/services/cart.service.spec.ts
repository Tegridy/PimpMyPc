import { BaseProduct } from 'src/app/shared/model/BaseProduct';
import { CartService } from './cart.service';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { car } from 'ionicons/icons';
import { of, Subscription } from 'rxjs';
import { Cart } from '../../shared/model/Cart';

describe('CartService', () => {
  let service: CartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add products to cart and update price', () => {
    const product: BaseProduct = { id: 1, title: 'Laptop', price: 800 };
    const product2: BaseProduct = { id: 2, title: 'Computer', price: 1800 };

    service.addProductToCart(product);
    service.addProductToCart(product2);

    service.currentCart.subscribe((cart) => {
      expect(cart.products.length).toBe(2);
      expect(cart.totalPrice).toBe(product.price + product2.price);
    });
  });

  it('should remove product from cart and update price', () => {
    const product: BaseProduct = { id: 1, title: 'Laptop', price: 800 };
    const product2: BaseProduct = { id: 2, title: 'Computer', price: 1800 };

    service.addProductToCart(product);
    service.addProductToCart(product2);
    service.removeProductFromCart(product.id);

    service.currentCart.subscribe((cart) => {
      expect(cart.products.length).toBe(1);
      expect(cart.products[0].id).toEqual(2);
      expect(cart.totalPrice).toBe(product2.price);
    });
  });

  it('should change cart state and update price', () => {
    const product: BaseProduct = { id: 1, title: 'Laptop', price: 800 };

    service.addProductToCart(product);

    service.currentCart.subscribe((cart) => {
      expect(cart.products.length).toBe(1);
      expect(cart.products[0].id).toEqual(1);
      expect(cart.totalPrice).toBe(product.price);
    });
  });

  it('should clear cart state', () => {
    const product: BaseProduct = { id: 1, title: 'Laptop', price: 800 };

    service.addProductToCart(product);
    service.clearCart();

    service.currentCart.subscribe((cart) => {
      expect(cart.products.length).toBe(0);
    });
  });
});
