import {Component, OnInit} from '@angular/core';
import {categories} from './Categories';
import {CategoriesService} from '../services/categories.service';
import {Router} from '@angular/router';

@Component({
  selector: 'pmp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  showMenu = false;
  toggleBackdrop = true;

  smth = '?page=1';

  mainCategories: any;
  currentProductsSelected: string = '';

  constructor(private categoryService: CategoriesService, private router: Router) {
  }

  ngOnInit(): void {
    this.mainCategories = categories;
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  toggleModal(): void {
    this.toggleBackdrop = !this.toggleBackdrop;
  }

  setCurrentCategory(category: string): void {
    this.categoryService.setCurrentCategoryName = category;
  }

}
