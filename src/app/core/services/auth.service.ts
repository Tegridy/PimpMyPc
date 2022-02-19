import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/model/User';
import { LoginDetails } from '../../shared/model/LoginDetails';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import Utils from 'src/app/shared/utils/Utils';
import { RegisterResponse } from 'src/app/shared/model/RegisterResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserLoggedIn = false;
  baseUrl = 'http://localhost:8080/api/v1/auth/';

  constructor(private http: HttpClient) {}

  loginUser(username: string, password: string): Observable<any> {
    return this.http.post(this.baseUrl + 'login', { username, password }).pipe(
      map((loginDetails) => {
        const details = loginDetails as LoginDetails;
        sessionStorage.setItem('username', details.username);
        sessionStorage.setItem('token', details.token);
        sessionStorage.setItem('userId', String(details.userId));
        this.isUserLoggedIn = true;
      }),
      catchError((error) => Utils.handleError(error))
    );
  }

  signUpUser(user: User): Observable<RegisterResponse> {
    return this.http
      .post<RegisterResponse>(this.baseUrl + 'register', user)
      .pipe(catchError((error) => Utils.handleError(error)));
  }
}
