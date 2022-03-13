import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

import { OrderService } from '../../core/services/order.service';
import { BaseProduct } from '../../shared/model/BaseProduct';
import { CartComponent } from './cart.component';
import { By } from '@angular/platform-browser';
import { CartService } from '../../core/services/cart.service';

describe('CheckoutComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let el: DebugElement;
  let service: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    service = TestBed.inject(CartService);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display empty cart message', () => {
    const message = el.query(By.css('#empty-cart-message'));

    expect(component.numberOfItemsInCart).toBe(0);
    expect(message.nativeElement.textContent).toBe(
      'Your cart is empty, please add some products'
    );
  });

  it('should display products in cart', () => {
    const product: BaseProduct = { id: 1, title: 'Laptop', price: 800 };
    const product2: BaseProduct = { id: 2, title: 'Computer', price: 1800 };

    component.cartItems = [product, product2];
    component.numberOfItemsInCart = 2;

    fixture.detectChanges();

    const products = el.queryAll(By.css('#product'));

    expect(products).toBeTruthy('Could not find products');
    expect(products.length).toBe(2, 'Unexpected number of products');
    expect(component.numberOfItemsInCart).toBe(2);
  });

  it('should remove product from cart', () => {
    const componentSpy = spyOn(component, 'removeProductFromCart');

    expect(componentSpy).not.toHaveBeenCalled();

    fixture.detectChanges();

    component.removeProductFromCart(1);

    fixture.detectChanges();

    expect(componentSpy).toHaveBeenCalled();
  });
});
