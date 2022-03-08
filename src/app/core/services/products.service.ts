import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, delay, debounceTime } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  ProductResponse,
  ProductDto,
} from '../../shared/model/ProductResponse';
import { BaseProduct } from '../../shared/model/BaseProduct';
import Utils from 'src/app/shared/utils/Utils';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl = 'http://localhost:8080/api/v1/products/';
  pageSizeUrl = '&size=9';

  private productsSearchResultSource = new BehaviorSubject<BaseProduct[]>([]);
  productsSearchResult = this.productsSearchResultSource.asObservable();

  constructor(private http: HttpClient) {}

  getProductsPage(
    page: number,
    category: string,
    filtersUrls?: string
  ): Observable<ProductResponse> {
    if (filtersUrls) {
      filtersUrls = filtersUrls.replace(new RegExp('&page=\\d*'), '');

      page = this.validatePageNumber(page);

      return this.http
        .get<ProductResponse>(
          this.baseUrl +
            category +
            '?page=' +
            page +
            filtersUrls +
            this.pageSizeUrl
        )
        .pipe(catchError(Utils.handleError));
    } else {
      page = this.validatePageNumber(page);

      return this.http
        .get<ProductResponse>(
          this.baseUrl + category + '?page=' + page + this.pageSizeUrl
        )
        .pipe(catchError(Utils.handleError));
    }
  }

  findProductsByCategory(
    productName: string,
    page: number,
    categoryName?: string
  ): Observable<ProductDto> {
    page = this.validatePageNumber(page);

    let requestUrl = this.baseUrl + 'search?productName=' + productName;

    if (categoryName !== undefined && categoryName !== 'Everywhere') {
      requestUrl += '&productCategory=' + categoryName;
    }

    return this.http.get<ProductDto>(
      requestUrl + this.pageSizeUrl + '&page=' + page
    );
  }

  getTopSellingProducts(): Observable<BaseProduct[]> {
    return this.http
      .get<BaseProduct[]>(this.baseUrl + 'top')
      .pipe(catchError(Utils.handleError));
  }

  getOurChoice(): Observable<BaseProduct[]> {
    return this.http
      .get<BaseProduct[]>(this.baseUrl + 'our-choice')
      .pipe(catchError(Utils.handleError));
  }

  getNewestProduct(): Observable<BaseProduct> {
    return this.http
      .get<BaseProduct>(this.baseUrl + 'newest')
      .pipe(catchError(Utils.handleError));
  }

  getProductById(id: number): Observable<BaseProduct> {
    console.log(this.baseUrl + id);
    return this.http
      .get<BaseProduct>(this.baseUrl + id)
      .pipe(catchError(Utils.handleError));
  }

  private validatePageNumber(page: number): number {
    if (page < 0) {
      return (page = 0);
    } else {
      return page;
    }
  }
}
