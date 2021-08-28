import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Laptop } from '../../shared/model/Laptop';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ProductResponse } from "../../shared/model/ProductResponse";

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) { }


  getAllLaptops(page: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>("http://localhost:8080/api/v1/products/laptops?page=" + page)
      .pipe(
          catchError(this.handleError)
      );
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
}
