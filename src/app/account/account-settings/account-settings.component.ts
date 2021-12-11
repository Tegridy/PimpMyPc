import {Component, OnInit} from '@angular/core';
import {UserService} from '../../core/services/user.service';

@Component({
  selector: 'pmp-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  currentModalSelected = '';
  showModal = false;

  personalDetailsEditModal = 'Personal details change';
  emailAddressEditModal = 'E-mail address change';
  passwordEditModal = 'Password change';

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUserDetails();
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
      u => console.log(u)
    );
  }

}
