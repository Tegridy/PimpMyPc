import { Currencies, Money } from 'ts-money';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pmp-product-small',
  templateUrl: './product-small.component.html',
  styleUrls: ['./product-small.component.scss']
})
export class ProductSmallComponent implements OnInit {


  @Input()
  product: any;

  @Input()
  listView = false;
  @Input()
  productsParams: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
