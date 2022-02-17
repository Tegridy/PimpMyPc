import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, delay, debounceTime } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  ProductResponse,
  ProductsDto,
} from '../../shared/model/ProductResponse';
import { BaseProduct } from '../../shared/model/BaseProduct';

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

      if (page === -1) {
        page = 1;
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
        .pipe(catchError(this.handleError));
    } else {
      return this.http
        .get<ProductResponse>(
          this.baseUrl + category + '?page=' + page + this.pageSizeUrl
        )
        .pipe(catchError(this.handleError));
    }
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else if (err.status == 0) {
      errorMessage =
        'An error occurred while products loading. Try again later.';
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  getProductsByCategory(
    productName: string,
    categoryName: string,
    pageNumber: number
  ): Observable<ProductsDto> {
    let requestUrl = this.baseUrl + 'search?productName=' + productName;

    if (categoryName !== undefined && categoryName !== 'Everywhere') {
      requestUrl += '&productCategory=' + categoryName;
    }

    return this.http.get<ProductsDto>(
      requestUrl + this.pageSizeUrl + '&page=' + pageNumber
    );
  }

  setData(data: BaseProduct[]): void {
    this.productsSearchResultSource.next(data);
  }

  getTopSellingProducts(): Observable<BaseProduct[]> {
    return this.http
      .get<BaseProduct[]>(this.baseUrl + 'top')
      .pipe(catchError(this.handleError));
  }

  getOurChoice(): Observable<BaseProduct[]> {
    return this.http
      .get<BaseProduct[]>(this.baseUrl + 'our-choice')
      .pipe(catchError(this.handleError));
  }

  getNewestProduct(): Observable<BaseProduct> {
    return this.http
      .get<BaseProduct>(this.baseUrl + 'newest')
      .pipe(catchError(this.handleError));
  }

  getProductById(id: number): Observable<any> {
    console.log(this.baseUrl + id);
    return this.http
      .get<any>(this.baseUrl + id)
      .pipe(catchError(this.handleError));
  }
}
