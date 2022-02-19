import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, delay, debounceTime } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  ProductResponse,
  ProductsDto,
} from '../../shared/model/ProductResponse';
import { BaseProduct } from '../../shared/model/BaseProduct';
import Utils from 'src/app/shared/utils/Utils';

@Injectable()
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

      if (page < 0) {
        page = 0;
      }

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
      return this.http
        .get<ProductResponse>(
          this.baseUrl + category + '?page=' + page + this.pageSizeUrl
        )
        .pipe(catchError(Utils.handleError));
    }
  }

  getProductsByCategory(
    productName: string,
    categoryName: string,
    page: number
  ): Observable<ProductsDto> {
    if (page < 0) {
      page = 0;
    }

    let requestUrl = this.baseUrl + 'search?productName=' + productName;

    if (categoryName !== undefined && categoryName !== 'Everywhere') {
      requestUrl += '&productCategory=' + categoryName;
    }

    return this.http.get<ProductsDto>(
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
}
