import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pmp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  showMenu = false;
  toggleBackdrop = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  toggleModal(): void {
    this.toggleBackdrop = !this.toggleBackdrop;
  }

  showModal(): void {
    // @ts-ignore
    document.querySelector('.backdrop').classList.remove('hidden');
  }

  removeModal(): void {
    // @ts-ignore
    document.querySelector('.backdrop').classList.add('hidden');
  }
}
