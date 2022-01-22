import { Category } from './../model/Category';
import { ConfiguratorService } from './../../core/services/configurator.service';
import { Component, Input, OnInit } from '@angular/core';
import { BaseProduct } from '../model/BaseProduct';
import { CartService } from '../../core/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pmp-product-small',
  templateUrl: './product-small.component.html',
  styleUrls: ['./product-small.component.scss'],
})
export class ProductSmallComponent implements OnInit {
  @Input()
  product: BaseProduct = { id: 0, price: 999, quantity: 0, title: 'Product' };

  @Input()
  listView = false;
  @Input()
  productsParams: string[] = [];
  @Input()
  configMode = false;

  constructor(
    private cartService: CartService,
    private configuratorService: ConfiguratorService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addItemToCart(): void {
    this.cartService.changeCart(this.product);
  }

  addItemToConfigurator(): void {
    this.configuratorService.addPart(this.product);

    this.router.navigate(['/build-pc'], {});
  }
}
