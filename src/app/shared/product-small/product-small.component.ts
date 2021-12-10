import {Component, Input, OnInit} from '@angular/core';
import {BaseProduct} from '../model/BaseProduct';
import {CartService} from '../../core/services/cart.service';

@Component({
  selector: 'pmp-product-small',
  templateUrl: './product-small.component.html',
  styleUrls: ['./product-small.component.scss']
})
export class ProductSmallComponent implements OnInit {


  @Input()
  product: BaseProduct = {id: 0, price: 999, quantity: 0, title: 'Product'};

  @Input()
  listView = false;
  @Input()
  productsParams: string[] = [];

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
  }

  addItemToCart(): void {
    this.cartService.changeCart(this.product);
  }

}
