import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address, User } from '../shared/model/User';
import { AuthService } from '../core/services/auth.service';
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

    const user = new User(
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
    this.auth.signUpUser(user).subscribe(
      (registerResponse) => {
        this.loading = false;
        console.log(registerResponse.username);

        this.toastr.success(
          'Account created!',
          'Welcome ' + registerResponse.username,
          {
            positionClass: 'toast-bottom-right',
          }
        );
        this.router.navigateByUrl('/login');
      },
      (errorMessage) => {
        this.errorMsg = errorMessage;
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
