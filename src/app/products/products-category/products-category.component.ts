import {ProductsService} from '../../core/services/products.service';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router, UrlSegment} from '@angular/router';
import {PaginationInstance} from 'ngx-pagination';
import {of} from 'rxjs';
import {isNumeric} from 'rxjs/internal-compatibility';
import {filters} from './ProductsFilters';
import {BaseProduct} from '../../shared/model/BaseProduct';
import {Filter, FilterValue} from '../../shared/model/Filter';
import {Param} from '../Param';
import {parse} from 'search-params';


@Component({
  selector: 'pmp-products-category',
  templateUrl: './products-category.component.html',
  styleUrls: ['./products-category.component.scss'],
})
export class ProductsCategoryComponent implements OnInit {

  constructor(
    private ref: ChangeDetectorRef,
    private router: Router,
    private productsService: ProductsService,
    private route: ActivatedRoute) {
    this.loadProducts();
  }

  pageParam = new Param('?page=', 1);

  showProductsInListView = false;
  showModal = false;

  loading = true;
  currentCategory = '';

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

  url = '';
  isChecked = false;

  sortType = 'default';
  queryParams: Param[] = [];

  activeFiltersIds: any[] = [];

  ngOnInit(): void {
    this.loadQueryParamsFromUrl();

    // const x = this.route.snapshot.queryParams;
    // for (const y of Object.entries(x)) {
    //
    //   if (Array.isArray(y[1])) {
    //
    //     for (const t of y[1]) {
    //       this.queryParams.push(new Param(y[0], t));
    //     }
    //
    //   } else {
    //     this.queryParams.push(new Param(y[0], y[1]));
    //   }
    // }

    this.router.events.subscribe((val) => {
      this.laptops = [];
      if (val instanceof NavigationStart) {
        this.loading = true;
      } else if (val instanceof NavigationEnd) {
        this.loadProducts();
      }
    });
  }

  private loadQueryParamsFromUrl(): void {
    const x = this.route.snapshot.queryParams;
    for (const y of Object.entries(x)) {

      if (Array.isArray(y[1])) {

        for (const t of y[1]) {
          this.queryParams.push(new Param(y[0], t));
        }

      } else {
        this.queryParams.push(new Param(y[0], y[1]));
      }
    }
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

  getCurrentCategoryProducts(page: number): void {
    const categoryName = this.getCategoryTypeFromUrl();
    const filtersUrl = this.buildUrl();

    console.log(page);

    this.productsService
      .getProductsPage(page - 1, categoryName, filtersUrl)
      .subscribe((productsPage) => {

        this.pageNumber = productsPage.products.number + 1;
        this.productsCount = productsPage.products.totalElements;

        this.validatePageNumber(page);

        this.laptops = productsPage.products.content;
        this.productsFilters = productsPage.filters;

        if (this.laptops.length > 0) {
          this.loading = false;
        }

        this.paginationConfig.currentPage = this.pageNumber;
        this.paginationConfig.totalItems = this.productsCount;

        this.updateUrl();
      });
  }

  getCategoryTypeFromUrl(): string {
    const type = this.router.url.split('/categories/')[1].toLocaleLowerCase().replace(new RegExp('\\?.+'), '');
    this.temp = filters.find((x) => x.name === type);
    if (type !== this.currentCategory) {
      this.queryParams.splice(1, this.queryParams.length);
      this.currentCategory = type;
      this.sortType = 'default';
      this.findAndUpdateQueryParam('page', '1');
    }
    return type;
  }

  buildUrl(): string {
    const url: string[] = [];

    this.queryParams.forEach((x: Param) => url.push(`&${x.key}=${x.value}`));
    return url.join('');
  }

  private validatePageNumber(page: number): void {
    const lastPageNumber = Math.ceil(this.productsCount / 9);

    if (page > lastPageNumber) {
      this.getCurrentCategoryProducts(lastPageNumber);
    }
  }

  updateUrl(): void {
    const currentUrl: ActivatedRoute = new ActivatedRoute();
    currentUrl.url = of([new UrlSegment(this.router.url, {name: 'pageNumber'})]);

    const params = parse(this.buildUrl());

    this.router.navigate(
      [],
      {
        relativeTo: currentUrl,
        queryParams: params,
        queryParamsHandling: ''
      });
  }

  filterClick(event: Event, mainProp: string, filterValue: FilterValue): void {
    this.isChecked = (event.target as HTMLInputElement).checked;
    const param = new Param(mainProp, filterValue.valueProperty, filterValue.id);

    if (this.isChecked) {
      this.queryParams.push(param);
      this.updateUrl();
      this.activeFiltersIds.push(filterValue.id);
    } else {

      const filterFound = this.queryParams.find(x => x.id === filterValue.id);

      if (filterFound) {
        const filterToRemoveIndex = this.queryParams.indexOf(filterFound);
        this.queryParams.splice(filterToRemoveIndex, 1);
      }
      this.activeFiltersIds.splice(this.activeFiltersIds.indexOf(filterValue.id), 1);
    }

    this.getCurrentCategoryProducts(1);
  }

  sortProductsByPrice(): void {
    const sortParam = new Param('sort', this.sortType);
    const isSortedParamChosen = this.queryParams.find(x => x.key === 'sort');
    const sortedParamIndex = this.queryParams.indexOf(sortParam);

    if (isSortedParamChosen) {
      if (this.sortType === 'price,asc') {
        isSortedParamChosen.value = 'price,asc';
      } else if (this.sortType === 'price,desc') {
        isSortedParamChosen.value = 'price,desc';
      } else {
        this.queryParams.splice(sortedParamIndex, 1);
      }
    } else {
      this.queryParams.push(sortParam);
    }

    this.getCurrentCategoryProducts(1);
  }

  onPageChange(page: number): void {
    this.loading = true;
    const pageNumParam = this.queryParams.find(x => x.key === 'page');

    if (pageNumParam) {
      pageNumParam.value = page;
    }
    this.updateUrl();
  }

  findAndUpdateQueryParam(paramName: string, valueToUpdate: string): void {
    const qParam = this.queryParams.find(param => param.key === paramName);
    if (qParam) {
      qParam.value = valueToUpdate;
    }
  }

  changeProductsView(): void {
    this.showProductsInListView = !this.showProductsInListView;
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  checkFilter(event: FilterValue, filterProperty: string): boolean {
    return this.queryParams.some(param => param.value === event.valueProperty && param.key === filterProperty);
  }
}
