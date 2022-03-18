import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Event, Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { Address, User } from '../../shared/model/User';
import { MyOrdersComponent } from './my-orders.component';
import { Order } from '../../shared/model/Order';
import { BaseProduct } from '../../shared/model/BaseProduct';
import { OrderStatusPipe } from '../../shared/pipes/order-status.pipe';

describe('MyOrdersComponent', () => {
  let component: MyOrdersComponent;
  let fixture: ComponentFixture<MyOrdersComponent>;
  let el: DebugElement;
  let mockRouter: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ToastrService, OrderStatusPipe],
      declarations: [MyOrdersComponent, OrderStatusPipe],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ToastrModule.forRoot(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MyOrdersComponent);
    mockRouter = TestBed.inject(Router);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display orders', () => {
    const product: BaseProduct = { id: 1, title: 'Laptop', price: 800 };
    const product2: BaseProduct = { id: 2, title: 'Computer', price: 1800 };

    const order: Order = {
      address: new Address('street1', 'city1', 'state1', '11-111'),
      id: 1,
      imgUrl: '/imgPath',
      orderDate: new Date('2022-02-02'),
      price: 999,
      products: [product, product2],
      status: 'IN_PROGRESS',
      title: 'Order 1',
    };

    const order2: Order = {
      address: new Address('street2', 'city2', 'state2', '22-111'),
      id: 2,
      imgUrl: '/imgPath',
      orderDate: new Date('2022-02-01'),
      price: 999,
      products: [product, product2],
      status: 'COMPLETED',
      title: 'Order 2',
    };

    component.userOrders = [order, order2];

    fixture.detectChanges();

    const orderEntry = el.nativeElement.querySelector('#order-1');
    const orderEntry2 = el.nativeElement.querySelector('#order-2');

    const orderEntrySpan = el.nativeElement.querySelector(
      '#order-1 div h4 span'
    );

    expect(orderEntry).toBeTruthy();
    expect(orderEntry2).toBeTruthy();
    expect(orderEntrySpan.textContent).toBe('IN PROGRESS');
  });
});
