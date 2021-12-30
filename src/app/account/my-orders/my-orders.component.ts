import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../core/services/order.service';

@Component({
  selector: 'pmp-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.orderService.getUserOrders().subscribe(x => console.log(x));
  }

}
