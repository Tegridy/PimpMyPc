import {Component, OnInit} from '@angular/core';
import {categories} from './Categories';
import {CategoriesService} from '../services/categories.service';

@Component({
  selector: 'pmp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  showMenu = false;
  toggleBackdrop = true;

  mainCategories: any;
  currentProductsSelected: string = '';

  constructor(private categoryService: CategoriesService) {
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
