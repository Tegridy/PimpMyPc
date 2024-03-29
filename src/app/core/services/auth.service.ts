import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/model/User';
import { LoginDetails } from '../../shared/model/LoginDetails';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import Utils from 'src/app/shared/utils/Utils';
import { RegisterResponse } from 'src/app/shared/model/RegisterResponse';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isUserLoggedInSource = new BehaviorSubject<boolean>(false);
  isUserLoggedIn = this.isUserLoggedInSource.asObservable();

  baseUrl = environment.API_URL + '/api/v1/auth/';

  constructor(private http: HttpClient) {}

  loginUser(username: string, password: string): Observable<any> {
    return this.http.post(this.baseUrl + 'login', { username, password }).pipe(
      map((loginDetails) => {
        const details = loginDetails as LoginDetails;
        sessionStorage.setItem('username', details.username);
        sessionStorage.setItem('token', details.token);
        sessionStorage.setItem('userId', String(details.userId));
        this.isUserLoggedInSource.next(true);
      }),
      catchError((error) => Utils.handleError(error))
    );
  }

  signUpUser(user: User): Observable<RegisterResponse> {
    console.log(user);
    return this.http
      .post<RegisterResponse>(this.baseUrl + 'register', user)
      .pipe(catchError((error) => Utils.handleError(error)));
  }

  logoutUser(): void {
    sessionStorage.clear();
    this.isUserLoggedInSource.next(false);
  }
}
