import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address, User } from '../shared/model/User';
import { AuthService } from '../core/services/auth.service';
import { debounce, debounceTime } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'pmp-register',
  templateUrl: './register.component.html',
  styleUrls: [],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  errorMsg = '';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      address: this.buildAddress(),
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  saveForm(): void {
    this.loading = true;

    const u = new User(
      this.registerForm.get('username')?.value,
      this.registerForm.get('password')?.value,
      this.registerForm.get('firstName')?.value,
      this.registerForm.get('lastName')?.value,
      new Address(
        this.registerForm.get('address.street')?.value,
        this.registerForm.get('address.city')?.value,
        this.registerForm.get('address.state')?.value,
        this.registerForm.get('address.zip')?.value
      ),
      this.registerForm.get('phone')?.value,
      this.registerForm.get('email')?.value
    );
    this.auth.signUpUser(u).subscribe(
      () => {
        console.log('Account created');
        this.loading = false;
        // this.router.navigate(['/login'], {});
        this.toastr.success(
          'Account created!',
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

  buildAddress(): FormGroup {
    return this.formBuilder.group({
      street: ['', [Validators.required, Validators.minLength(3)]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      state: ['', [Validators.required, Validators.minLength(3)]],
      zip: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
}
