import {CategoriesService} from './../../core/services/categories.service';
import {Laptop} from '../../shared/model/Laptop';
import {ProductsService} from './../../core/services/products.service';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, UrlSegment} from '@angular/router';
import {PaginationInstance} from 'ngx-pagination';
import {of} from 'rxjs';
import {isNumeric} from 'rxjs/internal-compatibility';

@Component({
  selector: 'pmp-products-category',
  templateUrl: './products-category.component.html',
  styleUrls: ['./products-category.component.scss'],
})
export class ProductsCategoryComponent implements OnInit {
  showProductsInListView = false;
  showModal = false;

  laptops: Laptop[] = [];

  pageNumber = 1;
  productsCount = 1;

  paginationConfig: PaginationInstance = {
    itemsPerPage: 9,
    currentPage: this.pageNumber,
    totalItems: this.productsCount,
  };

  constructor(
    private ref: ChangeDetectorRef,
    private router: Router,
    private productsService: ProductsService,
    private categoriesService: CategoriesService) {
  }

  ngOnInit(): void {
    const currentPageUrl = this.getPageNumberFromUrl();

    this.getCurrentCategoryProducts(currentPageUrl);
  }

  private getPageNumberFromUrl(): number {
    const currentPageNumber = Number(this.router.url.split('page=')[1]);

    if (isNumeric(currentPageNumber)) {
      return Math.abs(currentPageNumber);
    } else {
      return 1;
    }
  }

  getCurrentCategoryProducts(page: number): void {

    const categoryName = this.getCategoryTypeFromUrl();

    this.productsService
      .getProductsPage(page - 1, categoryName)
      .subscribe((products) => {
        this.pageNumber = products.currentPage + 1;
        this.productsCount = products.productsCount;
        console.log(this.pageNumber);

        this.validatePageNumber(page);

        this.laptops = products.products;

        this.paginationConfig.currentPage = this.pageNumber;
        this.paginationConfig.totalItems = products.productsCount;

        this.updateUrl(this.pageNumber);
      });
  }

  private validatePageNumber(page: number): void {
    if (page > Math.ceil(this.productsCount / 9)) {
      this.getCurrentCategoryProducts(Math.ceil(this.productsCount / 9));
    }
  }

  getCategoryTypeFromUrl(): string {
    return this.router.url.split('/categories/')[1].toLocaleLowerCase().replace(new RegExp('\\?.+'), '');
  }

  updateUrl(page: number): void {
    const currentUrl: ActivatedRoute = new ActivatedRoute();
    currentUrl.url = of([new UrlSegment(this.router.url, {name: 'pageNumber'})]);

    this.router.navigate(
      [],
      {
        relativeTo: currentUrl,
        queryParams: {page},
        queryParamsHandling: 'merge'
      });
  }

  onPageChange(page: number): void {
    this.getCurrentCategoryProducts(page);
  }

  changeProductsView(): void {
    this.showProductsInListView = !this.showProductsInListView;
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }
}
