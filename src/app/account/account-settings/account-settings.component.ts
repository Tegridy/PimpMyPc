import {Component, OnInit} from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Address, User} from '../../shared/model/User';
import {UserEdit} from '../../shared/model/UserEdit';
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

  userDetailsForm!: FormGroup;
  personalDetailsForm!: FormGroup;
  addressDetailsForm!: FormGroup;
  authDetailsForm!: FormGroup;


  constructor(private userService: UserService, private formBuilder: FormBuilder, private validators: ValidationService) {
  }

  ngOnInit(): void {
    this.getUserDetails();
    this.personalDetailsForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required, Validators.email]
    });

    this.addressDetailsForm = this.formBuilder.group({
      street: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
    });

    this.authDetailsForm = this.formBuilder.group({
      newPassword1: ['', [Validators.required]],
      newPassword2: ['', [Validators.required]]
    }, {validators: ValidationService.passwordMatcher});
  }

  toggleModal(modalName: string): void {
    this.showModal = !this.showModal;
    this.currentModalSelected = modalName;
  }

  setModalStatus(modalStatus: boolean): void {
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
  }

  updateData(): void {
    // this.setModalStatus(false);
    // const u = new UserEdit(
    //   this.firstName,
    //   this.lastName,
    //   new Address(
    //     this.street,
    //     this.city,
    //     this.state,
    //     this.zip,
    //   ),
    //   this.phone,
    //   this.email,
    //   this.newPassword
    // );
    // this.userService.updateUserAccountDetails(u);
  }

  savePersonalData(): void {
    const user = new UserEdit(
      this.personalDetailsForm.get('firstName')?.value,
      this.personalDetailsForm.get('lastName')?.value,
      this.personalDetailsForm.get('phone')?.value,
      this.personalDetailsForm.get('email')?.value,
    );
    this.userService.updateUserPersonalDetails(user);
  }

  saveAddressData(): void {
    const user = new UserEdit();
    user.setAddress = new Address(
      this.personalDetailsForm.get('street')?.value,
      this.personalDetailsForm.get('state')?.value,
      this.personalDetailsForm.get('city')?.value,
      this.personalDetailsForm.get('zip')?.value
    );
    console.log('Addres');
    console.log(user);
    this.userService.updateUserPersonalDetails(user);
  }

  saveAuthData(): void {
    const user = new UserEdit();
    user.setPassword = this.personalDetailsForm.get('newPassword')?.value;
    this.userService.updateUserPersonalDetails(user);
  }
}
