import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../core/services/products.service';
import { BaseProduct } from '../shared/model/BaseProduct';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';
import { parse } from 'search-params';
import Utils from '../shared/utils/Utils';
import { of } from 'rxjs';

@Component({
  selector: 'pmp-search',
  templateUrl: './search.component.html',
  styleUrls: [],
})
export class SearchComponent implements OnInit {
  searchedProducts: BaseProduct[] = [];

  loading = true;
  pageNumber = 1;
  productsCount = 1;
  queryParams: Params = {};

  paginationConfig: PaginationInstance = {
    itemsPerPage: 9,
    currentPage: this.pageNumber,
    totalItems: this.productsCount,
  };

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      this.pageNumber = Utils.validatePageNumber(params.page);
      this.queryParams = params;
      this.getProducts(this.queryParams);
      this.loading = true;
    });
  }

  ngOnInit(): void {}

  private getProducts(params: Params): void {
    this.productService
      .getProductsByCategory(params.query, params.category, this.pageNumber - 1)
      .subscribe((products) => {
        this.searchedProducts = products.content;
        this.productsCount = products.totalElements;
        this.paginationConfig.totalItems = this.productsCount;
        this.paginationConfig.currentPage = this.pageNumber;

        this.loading = false;
      });
  }

  onPageChange($event: number): void {
    this.pageNumber = $event;
    this.getProducts(this.queryParams);
    this.updateQueryParam({ page: this.pageNumber });
    this.updateUrl();
  }

  updateUrl(): void {
    const currentUrl: ActivatedRoute = new ActivatedRoute();
    currentUrl.url = of([
      new UrlSegment(this.router.url, { name: 'pageNumber' }),
    ]);

    const params = parse(Utils.buildUrl(this.queryParams));

    this.router.navigate([], {
      relativeTo: currentUrl,
      queryParams: params,
      queryParamsHandling: '',
    });
  }

  updateQueryParam(queryParam = {}, force = false): void {
    const queryParamLoc = Object.assign({}, this.queryParams);
    this.queryParams = force
      ? queryParam
      : Object.assign(queryParamLoc, queryParam);
  }
}
