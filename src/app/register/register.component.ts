import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Address, User} from '../shared/model/User';
import {AuthService} from '../core/services/auth.service';

@Component({
  selector: 'pmp-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: this.buildAddress(),
      email: ['', Validators.required],
      phone: [''],
      password: ['']
    });
  }

  saveForm(): void {
    const u = new User(
      this.registerForm.get('username')?.value,
      this.registerForm.get('password')?.value,
      this.registerForm.get('firstName')?.value,
      this.registerForm.get('lastName')?.value,
      new Address(
        this.registerForm.get('address.street')?.value,
        this.registerForm.get('address.city')?.value,
        this.registerForm.get('address.state')?.value,
        this.registerForm.get('address.zip')?.value,
      ),
      this.registerForm.get('phone')?.value,
      this.registerForm.get('email')?.value,
    );
    this.auth.signUpUser(u);
  }

  buildAddress(): FormGroup {
    return this.formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
    });
  }
}
