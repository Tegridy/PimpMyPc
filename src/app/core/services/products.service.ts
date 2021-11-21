import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, delay} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ProductResponse} from '../../shared/model/ProductResponse';
import {BaseProduct} from '../../shared/model/BaseProduct';

@Injectable()
export class ProductsService {

  productsEndpointName: any = '';
  baseUrl = 'http://localhost:8080/api/v1/products/';

  private productsSearchResultSource = new BehaviorSubject<BaseProduct[]>([]);
  productsSearchResult = this.productsSearchResultSource.asObservable();

  constructor(private http: HttpClient) {
  }

  getProductsPage(page: number, category: string, filtersUrls?: string): Observable<ProductResponse> {
    // this.productsEndpointName = categories.find(
    //   (cat) => cat.endpointName == category
    // );


    // const mainUrl = `${this.baseUrl + category}?page=${page}&size=9 `;

    // const url = filtersUrl ? mainUrl : mainUrl + filtersUrls;

    if (filtersUrls) {
      return this.http
        .get<ProductResponse>(
          this.baseUrl + category + '?page=' + page + '&size=9' + filtersUrls
        )
        .pipe(
          delay(1000),
          catchError(this.handleError));
    } else {
      return this.http
        .get<ProductResponse>(
          this.baseUrl + category + '?page=' + page + '&size=9'
        )
        .pipe(
          delay(1000),
          catchError(this.handleError));
    }
  }

  // getAllLaptops(page: number): Observable<ProductResponse> {
  //   return this.http
  //     .get<ProductResponse>(this.baseUrl + 'laptops?page=' + page)
  //     .pipe(catchError(this.handleError));
  // }

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

  getSearchedProductsByCategory(productName: string, categoryName: string): void {
    // this._productsSearchResult = this.http.get<any>(this.baseUrl + 'search?productName=' + productName + '&categoryName=' + categoryName);
  }


  fetchProductsByCategory(productName: string, categoryName: string): Observable<BaseProduct[]> {
    //let products: Observable<BaseProduct[]>;

    return this.http.get<BaseProduct[]>(this.baseUrl + 'search?productName=' + productName + '&productCategory=' + categoryName);
  }

  setData(data: BaseProduct[]): void {
    this.productsSearchResultSource.next(data);
  }

}
