import {ProductsService} from '../../core/services/products.service';
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

  constructor(
    private ref: ChangeDetectorRef,
    private router: Router,
    private productsService: ProductsService) {
    this.loadProducts();
  }

  showProductsInListView = false;
  showModal = false;

  loading = true;

  laptops: BaseProduct[] = [];

  pageNumber = 1;
  productsCount = 1;

  productsFilters: Filter[] = [];
  temp: any;

  filtersFromUrl = '';


  paginationConfig: PaginationInstance = {
    itemsPerPage: 9,
    currentPage: this.pageNumber,
    totalItems: this.productsCount,
  };

  url = '';
  isChecked = false;

  // setProductsSortOrder(asc: boolean): void {
  //   // TODO: find more efficient way of deleting from url
  //   asc ? this.url += '&sort=price' : this.url.replace('&sort=price', '');
  //   console.log(this.url);
  //   this.getCurrentCategoryProducts(1, this.url);
  // }

  sortType = 'default';

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
    const productsFilters = this.getFiltersFromUrl();

    // console.log(productsFilters);

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

  private getFiltersFromUrl(): string {
    const filterss = this.filtersFromUrl = this.router.url.split('filters=')[1];
    return filterss;
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
        //console.log(this.productsFilters);

        if (this.laptops.length > 0) {
          this.loading = false;
        }

        this.paginationConfig.currentPage = this.pageNumber;
        this.paginationConfig.totalItems = this.productsCount;

        this.updateUrl(this.pageNumber, this.url);

        // console.log('');
        // console.log(this.laptops);
        // console.log('');
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

  updateUrl(page: number, str: string): void {
    const currentUrl: ActivatedRoute = new ActivatedRoute();
    currentUrl.url = of([new UrlSegment(this.router.url, {name: 'pageNumber'})]);

    const queryParams = str ? {page, filters: str} : {page};

    this.router.navigate(
      [],
      {
        relativeTo: currentUrl,
        queryParams,
        queryParamsHandling: 'merge'
      });
  }


  onPageChange(page: number): void {
    this.loading = true;
    this.updateUrl(page, this.url);
  }

  changeProductsView(): void {
    this.showProductsInListView = !this.showProductsInListView;
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  filterClick(event: Event, mainProp: string, prop: string): void {
    this.isChecked = (event.target as HTMLInputElement).checked;
    this.url += '&' + mainProp + '=' + prop;

    if (this.isChecked) {
      this.getCurrentCategoryProducts(1, this.url);
      this.updateUrl(this.pageNumber, this.url);
    }
  }

  setFilters(val: string, id: number): boolean {
    return this.filtersFromUrl !== undefined && this.filtersFromUrl.includes(val);
  }

  sortProductsByPrice(): void {
    const sortAsc = '&sort=price,asc';
    const sortDesc = '&sort=price,desc';

    if (this.url.includes('&sort=')) {

      if (this.url.includes('price,asc')) {
        this.url = this.url.replace('price,asc', 'price,desc');
      } else {
        this.url = this.url.replace('price,desc', 'price,asc');
      }

    } else {
      if (this.sortType === 'asc') {
        this.url += sortAsc;
      } else {
        this.url += sortDesc;
      }
    }

    this.getCurrentCategoryProducts(1, this.url);
  }

  // deleteFromString(str: string, toRemove: string): string {
  //   const start = str.indexOf(toRemove);
  //   return str.substr(0, start) + str.substr(start + toRemove.length);
  // }
}

