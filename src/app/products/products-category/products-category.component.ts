import { Laptop } from '../../shared/model/Laptop';
import { ProductsService } from './../../core/services/products.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'pmp-products-category',
  templateUrl: './products-category.component.html',
  styleUrls: ['./products-category.component.scss'],
})
export class ProductsCategoryComponent implements OnInit {
  showProductsInListView = false;
  showModal = false;
  currentCategoryRoute = '';

  laptops: Laptop[] = [];

  pageNumber: number = 1;
  productsCount: number = 1;

  public paginationConfig: PaginationInstance = {
    itemsPerPage: 9,
    currentPage: this.pageNumber,
    totalItems: this.productsCount,
  };

  constructor(
    private ref: ChangeDetectorRef,
    private router: Router,
    location: Location,
    private productsService: ProductsService
  ) {
    location.onUrlChange(
      (val) => (this.currentCategoryRoute = val.split('/')[2])
    );
  }

  ngOnInit(): void {
    this.getCurrentCategoryProducts(1);

    //this.router.events.subscribe(v => console.log(v instanceof NavigationEnd ? v.url.split("/")[2] : ""));
  }

  changeProductsView(): void {
    this.showProductsInListView = !this.showProductsInListView;
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  getCurrentCategoryProducts(page: number) {
    this.productsService.getAllLaptops(page - 1).subscribe((laptops) => {
      this.pageNumber = laptops.currentPage + 1;
      this.productsCount = laptops.productsCount;
      this.laptops = laptops.products;

      this.paginationConfig.currentPage = this.pageNumber;
      this.paginationConfig.totalItems = laptops.productsCount;
    });
  }

  onPageChange(page: number) {
    this.getCurrentCategoryProducts(page);
  }
}
