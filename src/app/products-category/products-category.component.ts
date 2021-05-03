import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pmp-products-category',
  templateUrl: './products-category.component.html',
  styleUrls: ['./products-category.component.scss']
})
export class ProductsCategoryComponent implements OnInit {

  currentlyActiveView = true;

  constructor() { }

  ngOnInit(): void {
  }

  changeProductsView(): void {
    this.currentlyActiveView = !this.currentlyActiveView;
  }

}
