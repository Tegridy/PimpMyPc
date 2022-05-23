import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {
  ProductDto,
  ProductResponse,
} from '../../shared/model/ProductResponse';
import { BaseProduct } from '../../shared/model/BaseProduct';
import Utils from 'src/app/shared/utils/Utils';
import { environment } from '../../../environments/environment';
import { ProductCategory } from '../../shared/model/ProductCategory';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl = environment.API_URL + '/api/v1/products';
  pageSizeUrl = '&size=9';

  private productsSearchResultSource = new BehaviorSubject<BaseProduct[]>([]);
  productsSearchResult = this.productsSearchResultSource.asObservable();

  constructor(private http: HttpClient) {}

  getProductsPage(
    page: number,
    category: string,
    categoryId: number,
    filtersUrls?: string
  ): Observable<ProductResponse> {
    if (filtersUrls) {
      filtersUrls = filtersUrls.replace(new RegExp('&page=\\d*'), '');

      page = this.validatePageNumber(page);

      return this.http
        .get<ProductResponse>(
          this.baseUrl +
            '?page=' +
            page +
            filtersUrls +
            this.pageSizeUrl +
            '&categoryId=' +
            categoryId
        )
        .pipe(catchError(Utils.handleError));
    } else {
      page = this.validatePageNumber(page);

      return this.http
        .get<ProductResponse>(
          this.baseUrl +
            '?page=' +
            page +
            this.pageSizeUrl +
            '&categoryId=' +
            categoryId
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

    let requestUrl = this.baseUrl + '/search?productName=' + productName;

    if (categoryName !== undefined && categoryName !== 'Everywhere') {
      requestUrl += '&productCategory=' + categoryName;
    }

    return this.http.get<ProductDto>(
      requestUrl + this.pageSizeUrl + '&page=' + page
    );
  }

  getTopSellingProducts(): Observable<ProductDto> {
    return this.http
      .get<ProductDto>(this.baseUrl + '/top')
      .pipe(catchError(Utils.handleError));
  }

  getOurChoice(): Observable<ProductDto> {
    return this.http
      .get<ProductDto>(this.baseUrl + '/our-choice')
      .pipe(catchError(Utils.handleError));
  }

  getNewestProduct(): Observable<ProductDto> {
    return this.http
      .get<ProductDto>(this.baseUrl + '/newest')
      .pipe(catchError(Utils.handleError));
  }

  getProductById(id: number): Observable<BaseProduct> {
    return this.http
      .get<BaseProduct>(this.baseUrl + '/' + id)
      .pipe(catchError(Utils.handleError));
  }

  getProductsCategories(): Observable<ProductCategory[]> {
    return this.http
      .get<ProductCategory[]>(environment.API_URL + '/api/v1/categories')
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
