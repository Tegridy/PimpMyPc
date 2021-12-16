import {Component, OnInit} from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Address, User} from '../../shared/model/User';
import {UserEdit, UserEditAuth} from '../../shared/model/UserEdit';
import {ValidationService} from '../../core/services/validation.service';

@Component({
  selector: 'pmp-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  currentModalSelected = '';
  showModal = false;

  personalDetailsEditModal = 'Personal details change';
  addressDetailsEditModal = 'Address details change';
  passwordEditModal = 'Password change';

  personalDetailsForm!: FormGroup;
  addressDetailsForm!: FormGroup;
  authDetailsForm!: FormGroup;


  constructor(private userService: UserService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getUserDetails();
    this.personalDetailsForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.addressDetailsForm = this.formBuilder.group({
      street: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
    });

    this.authDetailsForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {validators: ValidationService.passwordMatcher});
  }

  toggleModal(modalName: string): void {
    this.showModal = !this.showModal;
    this.currentModalSelected = modalName;
  }

  turnOnModal(modalStatus: boolean): void {
    this.showModal = modalStatus;
  }

  getUserDetails(): void {
    this.userService.getUserAccountDetails().subscribe(
      u => this.loadFormData(u)
    );
  }

  loadFormData(userData: User): void {
    this.personalDetailsForm.patchValue({
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      email: userData.email
    });

    this.addressDetailsForm.patchValue({
      street: userData.address.street,
      state: userData.address.state,
      city: userData.address.city,
      zip: userData.address.zip
    });

    console.log(this.addressDetailsForm.get('street')?.value);
  }

  savePersonalData(): void {
    const user = new UserEdit(
      this.personalDetailsForm.get('firstName')?.value,
      this.personalDetailsForm.get('lastName')?.value,
      this.personalDetailsForm.get('phone')?.value,
      this.personalDetailsForm.get('email')?.value
    );
    this.userService.updateUserPersonalDetails(user);
    this.turnOnModal(false);
  }

  saveAddressData(): void {
    const address = new Address(
      this.addressDetailsForm.get('street')?.value,
      this.addressDetailsForm.get('state')?.value,
      this.addressDetailsForm.get('city')?.value,
      this.addressDetailsForm.get('zip')?.value
    );
    this.userService.updateUserAddressDetails(address);
    this.turnOnModal(false);
  }

  saveAuthData(): void {
    const user = new UserEditAuth(this.authDetailsForm.get('password')?.value);
    this.userService.updateUserAuthDetails(user);
    this.turnOnModal(false);
  }
}
