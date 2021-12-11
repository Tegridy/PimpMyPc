import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/services/auth.service';

@Component({
  selector: 'pmp-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  login = '';
  password = '';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  loginUser(): void {
    this.authService.loginUser(this.login, this.password);
  }
}
