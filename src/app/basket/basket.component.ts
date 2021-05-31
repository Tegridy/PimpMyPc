import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pmp-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  numberOfItemsInBasket = 0;
  basketItems: any[] = [];


  constructor() {
  }

  ngOnInit(): void {
  }

}
