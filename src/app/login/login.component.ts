import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'pmp-login',
  templateUrl: './login.component.html',
  styleUrls: [],
})
export class LoginComponent implements OnInit {
  // login = '';
  // password = '';
  loading = false;

  errorMsg = '';

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  loginUser(): void {
    this.loading = true;

    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.loginUser(username, password).subscribe(
      () => {
        this.router.navigateByUrl('/').then();
        this.toastr.success(
          'Login successful!',
          'Welcome ' + sessionStorage.getItem('username'),
          {
            positionClass: 'toast-bottom-right',
          }
        );
      },
      (error) => {
        this.errorMsg = error;
        this.loading = false;
      }
    );
  }
}
