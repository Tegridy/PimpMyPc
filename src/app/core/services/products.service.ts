import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  ProductResponse,
  ProductsDto,
} from '../../shared/model/ProductResponse';
import { BaseProduct } from '../../shared/model/BaseProduct';

@Injectable()
export class ProductsService {
  productsEndpointName: any = '';
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

      console.log(
        this.baseUrl +
          category +
          '?page=' +
          page +
          filtersUrls +
          this.pageSizeUrl
      );
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
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  setCurrentCategory(category: string): void {
    this.productsEndpointName = category;
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
    return this.http.get<BaseProduct[]>(this.baseUrl + 'top');
  }

  getOurChoice(): Observable<BaseProduct[]> {
    return this.http.get<BaseProduct[]>(this.baseUrl + 'our-choice');
  }

  getNewestProduct(): Observable<BaseProduct> {
    return this.http.get<BaseProduct>(this.baseUrl + 'newest');
  }

  getProductById(id: number): Observable<any> {
    console.log(this.baseUrl + id);
    return this.http.get<any>(this.baseUrl + id);
  }
}
