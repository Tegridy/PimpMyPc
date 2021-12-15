import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../shared/model/User';
import {Router} from '@angular/router';
import {LoginDetails} from '../../shared/model/LoginDetails';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Temp
  isUserLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) {
  }

  loginUser(username: string, password: string): void {
    this.http.post('http://localhost:8080/api/v1/auth/login', {username, password}).subscribe(
      (loginDetails) => {
        const x = loginDetails as LoginDetails;
        sessionStorage.setItem('token', x.token);
        sessionStorage.setItem('userId', String(x.userId));
        this.isUserLoggedIn = true;
        this.router.navigateByUrl('/').then();
      }
    );
  }

  signUpUser(user: User): void {
    this.http.post('http://localhost:8080/api/v1/auth/register', user).subscribe(
      token => {
        sessionStorage.setItem('token', token as string);
        this.isUserLoggedIn = true;
      }
    );
  }
}
