import { Component, OnInit } from '@angular/core';
import { categories } from './Categories';
import { Params, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Param } from '../../shared/model/Param';
import { Category } from 'src/app/shared/model/Category';

@Component({
  selector: 'pmp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private cartService: CartService, private router: Router) {}

  showMenu = false;
  toggleBackdrop = true;

  currentSearchCategory = '';
  searchPhrase = '';

  numberOfItemsInCart = 0;

  mainCategories: Category[] = [];
  queryParams!: Params;

  ngOnInit(): void {
    this.mainCategories = categories;
    this.cartService.currentCart.subscribe(
      (cart) => (this.numberOfItemsInCart = cart.products.length)
    );
  }

  changeCurrentSearchCategory(event: Event): void {
    const categoryName = (event.target as HTMLInputElement).value;
    this.currentSearchCategory = categoryName;
  }

  searchProduct(): void {
    if (this.searchPhrase) {
      const params: Params = {};
      params.query = this.searchPhrase;
      if (this.currentSearchCategory) {
        params.category = this.currentSearchCategory;
      }

      params.page = 1;
      this.router.navigate(['/search'], {
        queryParams: params,
      });
    }
    this.searchPhrase = '';
  }

  setFilter(param: Param): void {
    const paramKey = param.key;
    const paramValue = param.value;

    this.queryParams.page = 1;
    this.queryParams[paramKey] = paramValue;
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  toggleModal(): void {
    this.toggleBackdrop = !this.toggleBackdrop;
  }

  canMoveDeeperInMenu(menuItem: any): string | undefined {
    if (menuItem.firstLevelMenu || menuItem.secondLevelMenu) {
      return;
    } else {
      return '/categories/' + menuItem.endpointName;
    }
  }
}
