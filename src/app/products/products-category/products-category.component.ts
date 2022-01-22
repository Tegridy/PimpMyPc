import { ProductsService } from '../../core/services/products.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  UrlSegment,
} from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { of } from 'rxjs';
import { BaseProduct } from '../../shared/model/BaseProduct';
import { Filter, FilterGroup } from '../../shared/model/FilterGroup';
import { Param } from '../Param';
import { parse } from 'search-params';

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
    private route: ActivatedRoute
  ) {
    this.loadQueryParamsFromUrl();
  }

  showProductsInListView = false;
  showModal = false;

  loading = true;
  currentCategory = '';

  laptops: BaseProduct[] = [];

  pageNumber = 1;
  productsCount = 1;

  productsFilters: FilterGroup[] = [];

  paginationConfig: PaginationInstance = {
    itemsPerPage: 9,
    currentPage: this.pageNumber,
    totalItems: this.productsCount,
  };

  sortType = 'default';
  queryParams: Param[] = [];

  configurator = false;

  ngOnInit(): void {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.queryParams = [];
        this.loadQueryParamsFromUrl();
      }
    });
  }

  private loadQueryParamsFromUrl(): void {
    const queryParamsSnapshot = this.route.snapshot.queryParams;

    for (const param of Object.entries(queryParamsSnapshot)) {
      if (Array.isArray(param[1])) {
        param[1].forEach((p) => this.queryParams.push(new Param(param[0], p)));
      } else {
        this.queryParams.push(new Param(param[0], param[1]));
      }
    }
    this.checkIfConfig();
    this.getCurrentCategoryProducts(this.findCurrentPageNumber());
  }

  checkIfConfig(): void {
    const config = this.queryParams.find(
      (param) => param.key === 'config'
    )?.value;
    this.configurator = config as boolean;
  }

  private findCurrentPageNumber(): number {
    const pageNumber = this.queryParams.find((p) => p.key === 'page');

    if (pageNumber) {
      return Math.abs(pageNumber.value as number);
    } else {
      return 1;
    }
  }

  getCurrentCategoryProducts(page: number): void {
    const categoryName = this.getCategoryTypeFromUrl();

    const filtersUrl = this.buildUrl();

    this.productsService
      .getProductsPage(page - 1, categoryName, filtersUrl)
      .subscribe((productsPage) => {
        this.pageNumber = productsPage.products.number + 1;
        this.productsCount = productsPage.products.totalElements;

        this.validatePageNumber(page);

        this.laptops = productsPage.products.content;
        this.productsFilters = productsPage.filters;
        this.loadFiltersFromQueryParams();

        if (this.laptops.length > 0) {
          this.loading = false;
        }

        this.paginationConfig.currentPage = this.pageNumber;
        this.paginationConfig.totalItems = this.productsCount;
      });
  }

  private loadFiltersFromQueryParams(): void {
    this.productsFilters.forEach((v) => {
      v.values.forEach((v2) => {
        if (
          this.queryParams.find(
            (param) =>
              param.key === v.filterProperty && param.value === v2.valueProperty
          )
        ) {
          v2.isChecked = true;
        }
      });
    });
  }

  private getCategoryTypeFromUrl(): string {
    const category = this.router.url
      .split('/categories/')[1]
      .toLocaleLowerCase()
      .replace(new RegExp('\\?.+'), '');
    if (category !== this.currentCategory) {
      this.currentCategory = category;
      this.sortType = 'default';
      this.findAndUpdateQueryParam('page', '1');
    }
    return category;
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
    currentUrl.url = of([
      new UrlSegment(this.router.url, { name: 'pageNumber' }),
    ]);

    const params = parse(this.buildUrl());

    this.router.navigate([], {
      relativeTo: currentUrl,
      queryParams: params,
    });
  }

  filterClick(event: Event, mainProp: string, filterValue: Filter): void {
    filterValue.isChecked = !filterValue.isChecked;

    if (filterValue.isChecked) {
      this.queryParams.push(new Param(mainProp, filterValue.valueProperty));
    } else {
      const idx = this.queryParams.findIndex(
        (p) => p.key === mainProp && p.value === filterValue.valueProperty
      );
      this.queryParams.splice(idx, 1);
    }

    this.findAndUpdateQueryParam('page', '1');
    this.updateUrl();
  }

  sortProductsByPrice(): void {
    const sortParam = new Param('sort', this.sortType);
    const isSortedParamChosen = this.queryParams.find((x) => x.key === 'sort');
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

    this.findAndUpdateQueryParam('page', page);

    this.updateUrl();
  }

  findAndUpdateQueryParam(
    paramName: string,
    valueToUpdate: string | number
  ): void {
    const qParam = this.queryParams.find((param) => param.key === paramName);
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
}
