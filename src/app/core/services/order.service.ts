import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Order, OrderResponse} from '../../shared/model/Order';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  sendOrderRequest(order: Order): void {
    this.http.post('http://localhost:8080/api/v1/order', order).subscribe();
  }

  getUserOrders(): Observable<OrderResponse> {
    return this.http.get<OrderResponse>('http://localhost:8080/api/v1/order');
  }

  getOrderDetails(id: number): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/v1/order/' + id);
  }
}
