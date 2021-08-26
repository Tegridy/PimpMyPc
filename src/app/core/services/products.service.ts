import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Laptop } from '../../shared/model/Laptop';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) { }


  getAllLaptops(): Observable<Laptop[]> {
    return this.http.get<Laptop[]>("http://localhost:8080/api/v1/products/laptops")
      .pipe(
          tap(data => console.log('All: ', JSON.stringify(data))),
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
