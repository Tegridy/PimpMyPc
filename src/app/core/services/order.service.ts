import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order, OrderDto, OrderResponse } from '../../shared/model/Order';
import { Observable, throwError } from 'rxjs';
import Utils from 'src/app/shared/utils/Utils';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl = 'http://localhost:8080/api/v1/order/';

  constructor(private http: HttpClient) {}

  sendOrderRequest(order: Order): Observable<OrderDto> {
    return this.http
      .post<OrderDto>(this.baseUrl, order)
      .pipe(catchError((error) => Utils.handleError(error)));
  }

  getUserOrders(): Observable<OrderResponse> {
    return this.http
      .get<OrderResponse>(this.baseUrl)
      .pipe(catchError((error) => Utils.handleError(error)));
  }

  getOrderDetails(id: number): Observable<any> {
    return this.http
      .get<any>(this.baseUrl + id)
      .pipe(catchError((error) => Utils.handleError(error)));
  }
}
