import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Params, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Param } from '../../shared/model/Param';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../services/products.service';
import { ProductCategory } from '../../shared/model/ProductCategory';

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
    private toastr: ToastrService,
    private productsService: ProductsService
  ) {}

  showMenu = false;
  toggleBackdrop = true;

  private currentSearchCategory = '';
  searchPhrase = '';

  numberOfItemsInCart = 0;

  mainCategories: ProductCategory[] = [];
  private queryParams!: Params;

  isUserLoggedIn = false;

  ngOnInit(): void {
    this.productsService.getProductsCategories().subscribe((categories) => {
      this.mainCategories = categories.slice(0, 6);
    });

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

  navigateInMenu(menuItem: any): void {
    if (menuItem.subCategories && menuItem.subCategories.length < 1) {
      this.toggleMenu();
      this.router.navigate(['/categories/' + menuItem.title.toLowerCase()], {
        queryParams: { categoryId: menuItem.id, page: 1 },
      });
    }
  }

  logout(): void {
    this.authService.logoutUser();

    this.toastr.info('Logout successful!', 'Good bye!', {
      positionClass: 'toast-bottom-right',
    });
  }

  checkIfBuildPc(categoryId: number): void {
    if (categoryId === 4) {
      this.router.navigateByUrl('/build-pc');
    }
  }
}
