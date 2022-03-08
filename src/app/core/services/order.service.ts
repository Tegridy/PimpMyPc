import { Order } from './../../shared/model/Order';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CustomerOrderDetails,
  OrderDto,
  OrderResponse,
} from '../../shared/model/Order';
import { Observable, throwError } from 'rxjs';
import Utils from 'src/app/shared/utils/Utils';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl = 'http://localhost:8080/api/v1/order/';

  constructor(private http: HttpClient) {}

  sendOrderRequest(order: CustomerOrderDetails): Observable<OrderDto> {
    return this.http
      .post<OrderDto>(this.baseUrl, order)
      .pipe(catchError((error) => Utils.handleError(error)));
  }

  getUserOrders(): Observable<OrderResponse> {
    return this.http
      .get<OrderResponse>(this.baseUrl)
      .pipe(catchError((error) => Utils.handleError(error)));
  }

  getOrderDetails(id: number): Observable<Order> {
    return this.http
      .get<any>(this.baseUrl + id)
      .pipe(catchError((error) => Utils.handleError(error)));
  }
}
