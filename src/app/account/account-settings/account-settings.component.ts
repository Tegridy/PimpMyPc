import { Component, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  toggleModal(modalName: string): void {
    this.showModal = !this.showModal;
    this.currentModalSelected = modalName;
  }

  setModalStatus(modalStatus: boolean): void {
    this.showModal = modalStatus;
  }

}
