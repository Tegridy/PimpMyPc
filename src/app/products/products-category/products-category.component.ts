import { Laptop } from '../../shared/model/Laptop';
import { ProductsService } from './../../core/services/products.service';
import { categories } from './../../core/navbar/Categories';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'pmp-products-category',
  templateUrl: './products-category.component.html',
  styleUrls: ['./products-category.component.scss']
})
export class ProductsCategoryComponent implements OnInit {

  showProductsInListView = false;
  showModal = false;
  currentCategoryRoute = '';

  laptops: Laptop[] = [];


  constructor(private ref: ChangeDetectorRef, private router: Router, location: Location, private productsService: ProductsService) {
    location.onUrlChange(val =>
      this.currentCategoryRoute = val.split("/")[2]);
  }

  ngOnInit(): void {
    this.productsService.getAllLaptops().subscribe(laptops => this.laptops = laptops);

    this.router.events.subscribe(v => console.log(v instanceof NavigationEnd ? v.url.split("/")[2] : ""));

  }

  changeProductsView(): void {
    this.showProductsInListView = !this.showProductsInListView;
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }


  getCurrentCategoryProducts() {
    // this.http.get ...
  }
}
