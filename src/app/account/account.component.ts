import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pmp-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  showAccountMenu = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleAccountMenu(): void {
    this.showAccountMenu = !this.showAccountMenu;
  }
}
