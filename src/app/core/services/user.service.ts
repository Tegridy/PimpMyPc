import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../shared/model/User';
import {UserEdit} from '../../shared/model/UserEdit';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUserAccountDetails(): Observable<User> {
    const userId = sessionStorage.getItem('userId');
    return this.http.get<User>('http://localhost:8080/api/v1/user/account-details/' + userId);
  }

  updateUserAccountDetails(user: UserEdit): void {
    const userId = sessionStorage.getItem('userId');
    this.http.put('http://localhost:8080/api/v1/user/update/' + userId, user).subscribe();
  }

  updateUserPersonalDetails(user: UserEdit): void {
    const userId = sessionStorage.getItem('userId');
    this.http.put('http://localhost:8080/api/v1/user/' + userId + '/personal-details', user).subscribe();
  }

  updateUserAddressDetails(user: UserEdit): void {
    const userId = sessionStorage.getItem('userId');
    this.http.put('http://localhost:8080/api/v1/user/' + userId + '/address-details', user).subscribe();
  }

  updateUserAuthDetails(user: UserEdit): void {
    const userId = sessionStorage.getItem('userId');
    this.http.put('http://localhost:8080/api/v1/user/' + userId + '/auth-details', user).subscribe();
  }
}
