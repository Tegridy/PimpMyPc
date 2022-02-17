import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { User } from '../../shared/model/User';
import { Router } from '@angular/router';
import { LoginDetails } from '../../shared/model/LoginDetails';
import { map, catchError, tap, debounce, debounceTime } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserLoggedIn = false;

  constructor(private http: HttpClient) {}

  loginUser(username: string, password: string): Observable<any> {
    return this.http
      .post('http://localhost:8080/api/v1/auth/login', { username, password })
      .pipe(
        map((loginDetails) => {
          const details = loginDetails as LoginDetails;
          sessionStorage.setItem('username', details.username);
          sessionStorage.setItem('token', details.token);
          sessionStorage.setItem('userId', String(details.userId));
          this.isUserLoggedIn = true;
        }),
        catchError((error) => {
          let errorMsg: string = '';

          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
          } else {
            errorMsg = this.getServerErrorMessage(error);
          }

          return throwError(errorMsg);
        })
      );
  }

  signUpUser(user: User): Observable<any> {
    return this.http
      .post('http://localhost:8080/api/v1/auth/register', user)
      .pipe(
        map((username) => {
          sessionStorage.setItem('username', username as string);
        }),
        catchError((error) => {
          let errorMsg: string = '';

          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
          } else {
            errorMsg = this.getServerErrorMessage(error);
          }

          return throwError(errorMsg);
        })
      );
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    // switch (error.status) {
    //   case 403: {
    //     return error.error.message;
    //   }
    //   case 404: {
    //     return error.error.message;
    //   }
    //   case 409: {
    //     return error.error.message;
    //   }
    //   case 500: {
    //     return error.error.message;
    //   }
    //   default: {
    //     return `Unknown Server Error. Please try again later.`;
    //   }
    // }

    return error.error.message;
  }
}
