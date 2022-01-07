import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../core/services/order.service';
import {ActivatedRoute} from '@angular/router';
import {SingleOrder} from '../../shared/model/Order';
import {Address} from '../../shared/model/User';

@Component({
  selector: 'pmp-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  // @ts-ignore
  order: SingleOrder;
  orderProducts: any;
  // @ts-ignore
  orderAddress: Address;
  id = 0;

  constructor(private orderService: OrderService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService.getOrderDetails(this.id).subscribe(order => {
      this.order = order;
      this.orderProducts = order.products;
      this.orderAddress = order.address;
      console.log(this.orderAddress);
    });
  }

}
