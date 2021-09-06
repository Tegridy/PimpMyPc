import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ProductResponse} from '../../shared/model/ProductResponse';

@Injectable()
export class ProductsService {
  constructor(private http: HttpClient) {
  }

  productsEndpointName: any = '';
  baseUrl = 'http://localhost:8080/api/v1/products/';

  getProductsPage(page: number, category: string): Observable<ProductResponse> {
    // this.productsEndpointName = categories.find(
    //   (cat) => cat.endpointName == category
    // );
    

    return this.http
      .get<ProductResponse>(
        this.baseUrl + category + '?page=' + page
      )
      .pipe(catchError(this.handleError));
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

  setCurrentCategory(category: string) {
    this.productsEndpointName = category;
  }
}
