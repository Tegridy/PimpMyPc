import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'pmp-account',
  templateUrl: './account.component.html',
  styleUrls: [],
})
export class AccountComponent implements OnInit {
  showAccountMenu = false;
  username = 'User';

  constructor() {
    this.username = sessionStorage.getItem('username') as string;
  }

  ngOnInit(): void {
  }

  toggleAccountMenu(): void {
    this.showAccountMenu = !this.showAccountMenu;
  }
}
