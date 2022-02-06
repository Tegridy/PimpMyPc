import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../core/services/order.service';
import { SingleOrder } from '../../shared/model/Order';

@Component({
  selector: 'pmp-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {
  userOrders: SingleOrder[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getUserOrders().subscribe((orders) => {
      this.userOrders = orders.content;
    });
  }
}
