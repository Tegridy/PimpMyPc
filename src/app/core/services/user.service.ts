import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../shared/model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUserAccountDetails(): Observable<User> {
    const userId = localStorage.getItem('userId');
    return this.http.get<User>('http://localhost:8080/api/v1/user/account-details/' + userId);
  }
}
