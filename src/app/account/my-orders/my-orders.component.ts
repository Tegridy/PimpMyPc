import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../shared/model/Order';

@Component({
  selector: 'pmp-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: [],
})
export class MyOrdersComponent implements OnInit {
  userOrders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    const userId = Number(sessionStorage.getItem('userId'));

    this.orderService.getUserOrders(userId).subscribe((orders) => {
      this.userOrders = orders.content;
    });
  }
}
