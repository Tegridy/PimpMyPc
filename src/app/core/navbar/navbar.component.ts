import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { categories } from './Categories';
import { Params, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Param } from '../../shared/model/Param';
import { ToastrService } from 'ngx-toastr';
import { MenuCategory } from '../../shared/model/MenuCategory';

@Component({
  selector: 'pmp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  showMenu = false;
  toggleBackdrop = true;

  private currentSearchCategory = '';
  searchPhrase = '';

  numberOfItemsInCart = 0;

  mainCategories: MenuCategory[] = [];
  private queryParams!: Params;

  isUserLoggedIn = false;

  ngOnInit(): void {
    this.mainCategories = categories;
    this.cartService.currentCart.subscribe(
      (cart) => (this.numberOfItemsInCart = cart.products.length)
    );

    this.authService.isUserLoggedIn.subscribe(
      (isLoggedIn) => (this.isUserLoggedIn = isLoggedIn)
    );
  }

  changeCurrentSearchCategory(event: Event): void {
    this.currentSearchCategory = (event.target as HTMLInputElement).value;
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

  toggleMenuBackdrop(): void {
    this.toggleBackdrop = !this.toggleBackdrop;
  }

  checkIfMenuCanBeClosed(menuItem: any): void {
    if (!menuItem.firstLevelMenu && !menuItem.secondLevelMenu) {
      this.toggleMenu();
    }
  }

  canMoveDeeperInMenu(menuItem: any): string | undefined {
    if (menuItem.firstLevelMenu || menuItem.secondLevelMenu) {
      return;
    } else {
      return '/categories/' + menuItem.endpointName;
    }
  }

  logout(): void {
    this.authService.logoutUser();

    this.toastr.info('Logout successful!', 'Good bye!', {
      positionClass: 'toast-bottom-right',
    });
  }
}
