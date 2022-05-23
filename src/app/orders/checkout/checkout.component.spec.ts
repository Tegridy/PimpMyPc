import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { add } from 'ionicons/icons';
import { CheckoutComponent } from './checkout.component';
import { AuthService } from '../../core/services/auth.service';
import { OrderService } from '../../core/services/order.service';
import { Address } from '../../shared/model/User';
import { BaseProduct } from '../../shared/model/BaseProduct';
import { By } from '@angular/platform-browser';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let el: DebugElement;
  let service: OrderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    service = TestBed.inject(OrderService);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    fixture.detectChanges();
  });

  const product: BaseProduct = { id: 1, title: 'Laptop', price: 800 };
  const product2: BaseProduct = { id: 2, title: 'Computer', price: 1800 };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the form controls', () => {
    const formElement = el.nativeElement.querySelector('#checkout-form');
    const inputElements = formElement.querySelectorAll('input');

    expect(inputElements.length).toBe(9);
  });

  it('should display the form control firstname length error', () => {
    component.checkoutForm.controls.customerFirstName.setValue('a');

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe(
      'The first name must be longer than 3 characters.'
    );
  });

  it('should display the form control firstname require error', () => {
    component.checkoutForm.controls.customerFirstName.markAsTouched();

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe('Please enter your first name.');
  });

  it('should display the form control lastname length error', () => {
    component.checkoutForm.controls.customerLastName.setValue('a');

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe(
      'The last name must be longer than 3 characters.'
    );
  });

  it('should display the form control lastname require error', () => {
    component.checkoutForm.controls.customerLastName.markAsTouched();

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe('Please enter your last name.');
  });

  it('should display the form control email require error', () => {
    component.checkoutForm.controls.customerEmail.markAsTouched();

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe('E-mail address is required.');
  });

  it('should display the form control email validation error', () => {
    component.checkoutForm.controls.customerEmail.setValue('notvalidmail');

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe('E-mail address is not valid.');
  });

  it('should display the form control phone require error', () => {
    component.checkoutForm.controls.customerPhone.markAsTouched();

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe('Phone number is required.');
  });

  it('should display the form control phone validation error', () => {
    component.checkoutForm.controls.customerPhone.setValue(
      'not a phone number'
    );

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe('Phone number is not valid.');
  });

  it('should display the form control state length error', () => {
    component.checkoutForm.controls.deliveryAddress.get('state')?.setValue('a');

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe(
      'The state name must be longer than 3 characters.'
    );
  });

  it('should display the form control state require error', () => {
    component.checkoutForm.controls.deliveryAddress
      .get('state')
      ?.markAsTouched();

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe('Please enter your state name.');
  });

  it('should display the form control city length error', () => {
    component.checkoutForm.controls.deliveryAddress.get('city')?.setValue('a');

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe(
      'The city name must be longer than 3 characters.'
    );
  });

  it('should display the form control city require error', () => {
    component.checkoutForm.controls.deliveryAddress
      .get('city')
      ?.markAsTouched();

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe('Please enter your city name.');
  });

  it('should display the form control street length error', () => {
    component.checkoutForm.controls.deliveryAddress
      .get('street')
      ?.setValue('a');

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe(
      'The street name must be longer than 3 characters.'
    );
  });

  it('should display the form control street require error', () => {
    component.checkoutForm.controls.deliveryAddress
      .get('street')
      ?.markAsTouched();

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe('Please enter your street name.');
  });

  it('should display the form control zip code length error', () => {
    component.checkoutForm.controls.deliveryAddress.get('zip')?.setValue('1');

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe(
      'The zip code must be longer than 3 characters.'
    );
  });

  it('should display the form control zip code require error', () => {
    component.checkoutForm.controls.deliveryAddress.get('zip')?.markAsTouched();

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe('Please enter your zip code.');
  });

  it('should display products in cart', () => {
    component.cart.products = [product, product2];

    fixture.detectChanges();

    const products = el.queryAll(By.css('#product'));

    expect(products).toBeTruthy('Could not find products');
    expect(products.length).toBe(2, 'Unexpected number of products');
  });

  it('should disable save button when there is no items in cart', () => {
    fixture.detectChanges();

    const saveButton = el.query(By.css('#save-order-button'));

    expect(saveButton).toBeTruthy('Button should be displayed');
    expect(saveButton.nativeElement.disabled).toBe(
      true,
      'Button should be disabled when there are products in cart'
    );
  });

  it('should enable save button when there are items in cart', () => {
    component.cart.products = [product, product2];

    fixture.detectChanges();

    const saveButton = el.query(By.css('#save-order-button'));

    expect(saveButton).toBeTruthy('Button should be displayed');
    expect(saveButton.nativeElement.disabled).toBe(
      false,
      'Button should be enabled when there are products in cart'
    );
  });
});
