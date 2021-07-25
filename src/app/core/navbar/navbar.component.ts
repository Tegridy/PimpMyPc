import { Component, OnInit } from '@angular/core';
import {categories} from './Categories';

@Component({
  selector: 'pmp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  showMenu = false;
  toggleBackdrop = true;

  mainCategories = categories;


  constructor() {
  }

  ngOnInit(): void {
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  toggleModal(): void {
    this.toggleBackdrop = !this.toggleBackdrop;
  }
}
