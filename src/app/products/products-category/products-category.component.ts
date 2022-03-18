import { ProductsService } from '../../core/services/products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { Subscription } from 'rxjs';
import { BaseProduct } from '../../shared/model/BaseProduct';
import { Filter, FilterGroup } from '../../shared/model/FilterGroup';
import { Param } from '../../shared/model/Param';
import Utils from 'src/app/shared/utils/Utils';

@Component({
  selector: 'pmp-products-category',
  templateUrl: './products-category.component.html',
  styleUrls: [],
})
export class ProductsCategoryComponent implements OnInit, OnDestroy {
  showProductsInListView = false;
  showModal = false;
  loading = true;
  configurator = false;

  private currentCategory = '';
  errorMessage = '';
  sortType = 'default';

  pageNumber = 1;
  private productsCount = 0;

  products: BaseProduct[] = [];
  productsFilters: FilterGroup[] = [];
  private queryParams: Param[] = [];

  private subscription: Subscription = new Subscription();

  paginationConfig: PaginationInstance = {
    itemsPerPage: 9,
    currentPage: this.pageNumber,
    totalItems: this.productsCount,
  };

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {
    this.loadQueryParamsFromUrl();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.router.events.subscribe((navigationEvent) => {
        if (navigationEvent instanceof NavigationEnd) {
          this.queryParams = [];
          this.loadQueryParamsFromUrl();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadQueryParamsFromUrl(): void {
    const queryParamsSnapshot = this.route.snapshot.queryParams;

    for (const param of Object.entries(queryParamsSnapshot)) {
      const paramKey = param[0];
      const paramValues = param[1];

      if (Array.isArray(paramValues)) {
        paramValues.forEach((value) => {
          this.queryParams.push(new Param(paramKey, value));
        });
      } else {
        this.queryParams.push(new Param(paramKey, paramValues));
      }
    }

    this.checkIfConfigMode();
    this.getCurrentCategoryProducts(this.findCurrentPageNumber());
  }

  private checkIfConfigMode(): void {
    const config = this.queryParams.find(
      (param) => param.key === 'config'
    )?.value;
    this.configurator = config as boolean;
  }

  private getCurrentCategoryProducts(page: number): void {
    page = Utils.validatePageNumber(page);

    const categoryName = this.getCategoryTypeFromUrl();
    const filtersUrl = Utils.buildUrl(this.queryParams);

    this.productsService
      .getProductsPage(page - 1, categoryName, filtersUrl)
      .subscribe(
        (productsPage) => {
          this.pageNumber = productsPage.products.number + 1;
          this.productsCount = productsPage.products.totalElements;

          this.loadPaginationConfig();

          this.products = productsPage.products.content;

          this.checkIfProductsExists();

          this.productsFilters = productsPage.filters;

          this.loadFiltersFromQueryParams();

          this.sortFiltersByName();

          this.loading = false;
        },
        (error) => {
          this.errorMessage = error;
          this.loading = false;
        }
      );
  }

  private loadPaginationConfig(): void {
    this.paginationConfig.currentPage = this.pageNumber;
    this.paginationConfig.totalItems = this.productsCount;
  }

  private checkIfProductsExists(): void {
    if (this.products.length < 1) {
      this.errorMessage = 'No products found.';
    } else {
      this.errorMessage = '';
    }
  }

  private findCurrentPageNumber(): number {
    const pageNumber = this.queryParams.find(
      (pageNumberParam) => pageNumberParam.key === 'page'
    );

    return Utils.validatePageNumber(pageNumber?.value as number);
  }

  private loadFiltersFromQueryParams(): void {
    this.productsFilters.forEach((filterGroup) => {
      filterGroup.values.forEach((filter) => {
        if (
          this.queryParams.find(
            (param) =>
              param.key === filterGroup.filterProperty &&
              param.value === filter.valueProperty
          )
        ) {
          filter.isChecked = true;
        }
      });
    });
  }

  private getCategoryTypeFromUrl(): string {
    let category = 'laptops';

    if (this.router.url.split('/categories')[1] !== undefined) {
      category = this.router.url
        .split('/categories/')[1]
        .toLocaleLowerCase()
        .replace(new RegExp('\\?.+'), '');
    }

    this.resetUrlIfCategoryChanged(category);

    return category;
  }

  private resetUrlIfCategoryChanged(category: string): void {
    if (category !== this.currentCategory) {
      this.currentCategory = category;
      this.sortType = 'default';
      this.findAndUpdateQueryParam('page', '1');
    }
  }

  filterClick(filterGroup: FilterGroup, filter: Filter): void {
    this.toggleFilter(filter);

    if (filter.isChecked) {
      this.queryParams.push(
        new Param(filterGroup.filterProperty, filter.valueProperty)
      );
    } else {
      const index = this.queryParams.findIndex(
        (param) =>
          param.key === filterGroup.filterProperty &&
          param.value === filter.valueProperty
      );
      this.queryParams.splice(index, 1);
    }

    this.findAndUpdateQueryParam('page', '1');
    Utils.updateUrl(this.queryParams, this.router);
  }

  toggleFilter(filter: Filter): void {
    filter.isChecked = !filter.isChecked;
  }

  sortProductsByPrice(): void {
    const sortParam = new Param('sort', this.sortType);
    const sortedParam = this.queryParams.find((param) => param.key === 'sort');
    const sortedParamIndex = this.queryParams.indexOf(sortParam);

    if (sortedParam) {
      if (this.sortType === 'price,asc') {
        sortedParam.value = 'price,asc';
      } else if (this.sortType === 'price,desc') {
        sortedParam.value = 'price,desc';
      } else {
        this.queryParams.splice(sortedParamIndex, 1);
      }
    } else {
      this.queryParams.push(sortParam);
    }

    this.getCurrentCategoryProducts(1);
  }

  private sortFiltersByName(): void {
    this.productsFilters.forEach((mainFilter) =>
      mainFilter.values.sort((firstFilter, secondFilter) =>
        firstFilter.name.localeCompare(secondFilter.name, 'en', {
          numeric: true,
        })
      )
    );
  }

  onPageChange(page: number): void {
    this.loading = true;

    this.findAndUpdateQueryParam('page', page);

    Utils.updateUrl(this.queryParams, this.router);
  }

  private findAndUpdateQueryParam(
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
