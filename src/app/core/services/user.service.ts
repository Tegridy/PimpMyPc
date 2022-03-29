import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address, User } from '../../shared/model/User';
import { UserEdit, UserEditAuth } from '../../shared/model/UserEdit';
import Utils from 'src/app/shared/utils/Utils';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.API_URL + '/api/v1/user/';

  constructor(private http: HttpClient) {}

  getUserAccountDetails(): Observable<User> {
    const userId = sessionStorage.getItem('userId');
    return this.http
      .get<User>(this.baseUrl + userId)
      .pipe(catchError((error) => Utils.handleError(error)));
  }

  updateUserPersonalDetails(user: UserEdit): Observable<UserEdit> {
    const userId = sessionStorage.getItem('userId');
    return this.http
      .patch<User>(this.baseUrl + userId + '/personal', user)
      .pipe(catchError((error) => Utils.handleError(error)));
  }

  updateUserAddressDetails(userAddress: Address): Observable<any> {
    const userId = sessionStorage.getItem('userId');
    return this.http
      .patch(this.baseUrl + userId + '/address', userAddress)
      .pipe(catchError((error) => Utils.handleError(error)));
  }

  updateUserAuthDetails(user: UserEditAuth): Observable<any> {
    const userId = sessionStorage.getItem('userId');
    return this.http
      .patch(this.baseUrl + userId + '/auth', user)
      .pipe(catchError((error) => Utils.handleError(error)));
  }

  private getUserId(): number {
    const id = sessionStorage.getItem('userId');
    if (id) {
      return Number(id);
    } else {
      return -1;
    }
  }
}
