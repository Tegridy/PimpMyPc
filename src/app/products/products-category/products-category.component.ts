import {ProductsService} from './../../core/services/products.service';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router, UrlSegment} from '@angular/router';
import {PaginationInstance} from 'ngx-pagination';
import {of} from 'rxjs';
import {isNumeric} from 'rxjs/internal-compatibility';
import {filters} from './ProductsFilters';
import {BaseProduct} from '../../shared/model/BaseProduct';
import {Filter} from '../../shared/model/Filter';


@Component({
  selector: 'pmp-products-category',
  templateUrl: './products-category.component.html',
  styleUrls: ['./products-category.component.scss'],
})
export class ProductsCategoryComponent implements OnInit {
  showProductsInListView = false;
  showModal = false;

  loading = true;

  laptops: BaseProduct[] = [];

  pageNumber = 1;
  productsCount = 1;

  productsFilters: Filter[] = [];
  temp: any;

  paginationConfig: PaginationInstance = {
    itemsPerPage: 9,
    currentPage: this.pageNumber,
    totalItems: this.productsCount,
  };

  constructor(
    private ref: ChangeDetectorRef,
    private router: Router,
    private productsService: ProductsService) {
    this.loadProducts();
  }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      this.laptops = [];
      if (val instanceof NavigationStart) {
        this.loading = true;
      } else if (val instanceof NavigationEnd) {
        this.loadProducts();
      }
    });
  }

  loadProducts(): void {
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

  getCurrentCategoryProducts(page: number, filtersUrl?: string): void {

    const categoryName = this.getCategoryTypeFromUrl();

    this.productsService
      .getProductsPage(page - 1, categoryName, this.url)
      .subscribe((productsPage) => {

        this.pageNumber = productsPage.products.number + 1;
        this.productsCount = productsPage.products.totalElements;

        this.validatePageNumber(page);

        this.laptops = productsPage.products.content;
        this.productsFilters = productsPage.filters;
        console.log(this.productsFilters);

        if (this.laptops.length > 0) {
          this.loading = false;
        }

        this.paginationConfig.currentPage = this.pageNumber;
        this.paginationConfig.totalItems = this.productsCount;

        this.updateUrl(this.pageNumber);

        console.log('');
        console.log(this.laptops);
        console.log('');
      });
  }

  private validatePageNumber(page: number): void {
    const lastPageNumber = Math.ceil(this.productsCount / 9);

    if (page > lastPageNumber) {
      this.getCurrentCategoryProducts(lastPageNumber);
    }
  }

  getCategoryTypeFromUrl(): string {
    const type = this.router.url.split('/categories/')[1].toLocaleLowerCase().replace(new RegExp('\\?.+'), '');
    this.temp = filters.find((x) => x.name === type);
    return type;
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
    this.loading = true;
    this.updateUrl(page);
  }

  changeProductsView(): void {
    this.showProductsInListView = !this.showProductsInListView;
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  url = '';

  filterClick(event: Event, mainProp: string, prop: string): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.url += '&' + mainProp + '=' + prop;
    console.log(this.url);
    this.getCurrentCategoryProducts(1, this.url);
  }
}

