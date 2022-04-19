import { Order, OrderResponse } from './../../shared/model/Order';
import { Address } from './../../shared/model/User';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OrderService } from './order.service';
import { CustomerOrderDetails, OrderDto } from 'src/app/shared/model/Order';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const order: Order = {
    id: 1,
    title: 'Order 1',
    price: 3400,
    imgUrl: '/img',
    products: [],
    status: 'IN_PROGRESS',
    orderDate: new Date('2022-02-02'),
    address: new Address('street1', 'city1', 'state1', '11-111'),
  };

  const order2: Order = {
    id: 1,
    title: 'Order 2',
    price: 1400,
    imgUrl: '/img',
    products: [],
    status: 'COMPLETE',
    orderDate: new Date('2022-01-02'),
    address: new Address('street1', 'city1', 'state1', '11-111'),
  };

  const orderDetails: CustomerOrderDetails = {
    customerFirstName: 'John',
    customerLastName: 'Doe',
    customerPhone: '123456789',
    customerEmail: 'test2@mail.com',
    deliveryAddress: new Address('street2', 'city2', 'state2', '22-111'),
  };

  const orders: Order[] = [order, order2];
  const orderRes: OrderResponse = {
    id: 1,
    content: orders,
  };

  const oDto: OrderDto = { id: 1, status: 'IN_PROGRESS' };

  it('should send order request', () => {
    service.saveOrder(orderDetails).subscribe((orderDto: OrderDto) => {
      expect(orderDto.id).toEqual(oDto.id);
      expect(orderDto.status).toEqual(oDto.status);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/v1/order/');
    expect(req.request.method).toEqual('POST');
    req.flush(oDto);
  });

  it('should get all orders', () => {
    service.getUserOrders().subscribe((orderResponse: OrderResponse) => {
      expect(orderResponse.content.length).toEqual(orders.length);
      expect(orderResponse.content[0].title).toEqual(order.title);
      expect(orderResponse.content[1].title).toEqual(order2.title);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/v1/order/');
    expect(req.request.method).toEqual('GET');
    req.flush(orderRes);
  });

  it('should return order details by id', () => {
    service.getOrderDetails(23).subscribe((o: Order) => {
      expect(o.id).toEqual(order.id);
      expect(o.title).toEqual(order.title);
      expect(o.price).toEqual(order.price);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/v1/order/23');
    expect(req.request.method).toEqual('GET');
    req.flush(order);
  });
});
