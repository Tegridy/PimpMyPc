import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address, User } from '../../shared/model/User';
import { UserEdit, UserEditAuth } from '../../shared/model/UserEdit';
import { ValidationService } from '../../core/services/validation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'pmp-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: [],
})
export class AccountSettingsComponent implements OnInit {
  currentModal = '';
  showModal = false;

  personalDetailsEditModalName = 'Personal details change';
  addressDetailsEditModalName = 'Address details change';
  passwordEditModalName = 'Password change';

  personalDetailsForm!: FormGroup;
  addressDetailsForm!: FormGroup;
  authDetailsForm!: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
    this.personalDetailsForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]],
    });

    this.addressDetailsForm = this.formBuilder.group({
      street: ['', [Validators.required, Validators.minLength(3)]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      state: ['', [Validators.required, Validators.minLength(3)]],
      zip: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.authDetailsForm = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      { validators: ValidationService.passwordMatcher }
    );
  }

  setModal(modalName: string): void {
    this.currentModal = modalName;
    this.toggleModal();
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  private getUserDetails(): void {
    this.userService
      .getUserAccountDetails()
      .subscribe((user) => this.loadFormData(user));
  }

  loadFormData(userData: User): void {
    this.personalDetailsForm.patchValue({
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      email: userData.email,
    });

    this.addressDetailsForm.patchValue({
      street: userData.address.street,
      state: userData.address.state,
      city: userData.address.city,
      zip: userData.address.zip,
    });
  }

  savePersonalData(): void {
    const user = new UserEdit(
      this.personalDetailsForm.get('firstName')?.value,
      this.personalDetailsForm.get('lastName')?.value,
      this.personalDetailsForm.get('phone')?.value,
      this.personalDetailsForm.get('email')?.value
    );
    this.userService.updateUserPersonalDetails(user).subscribe(
      () => {
        this.showSuccessToast();
      },
      (error) => this.showErrorToast(error)
    );
    this.toggleModal();
  }

  saveAddressData(): void {
    const address = new Address(
      this.addressDetailsForm.get('street')?.value,
      this.addressDetailsForm.get('state')?.value,
      this.addressDetailsForm.get('city')?.value,
      this.addressDetailsForm.get('zip')?.value
    );
    this.userService.updateUserAddressDetails(address).subscribe(
      () => {
        this.showSuccessToast();
      },
      (error) => this.showErrorToast(error)
    );
    this.toggleModal();
  }

  saveAuthData(): void {
    const user = new UserEditAuth(this.authDetailsForm.get('password')?.value);
    this.userService.updateUserAuthDetails(user).subscribe(
      () => {
        this.showSuccessToast();
      },
      (error) => this.showErrorToast(error)
    );
    this.toggleModal();
  }

  private showSuccessToast(): void {
    this.toastr.success('User data updated successfuly!', 'Update', {
      positionClass: 'toast-bottom-right',
    });
  }

  private showErrorToast(errorMessage: string): void {
    this.toastr.error(errorMessage, 'Update error', {
      positionClass: 'toast-bottom-right',
    });
  }
}
