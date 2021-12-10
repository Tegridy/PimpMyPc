import {Component, OnInit} from '@angular/core';
import {categories} from './Categories';
import {CategoriesService} from '../services/categories.service';
import {Params, Router} from '@angular/router';
import {ProductsService} from '../services/products.service';
import {BaseProduct} from '../../shared/model/BaseProduct';
import {CartService} from '../services/cart.service';

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
  currentProductsSelected = '';
  currentSearchCategory = '';

  searchPhrase: string = '';

  numberOfItemsInCart = 0;

  constructor(private cartService: CartService, private categoryService: CategoriesService, private router: Router, private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.mainCategories = categories;
    this.cartService.currentCart.subscribe(cart => this.numberOfItemsInCart = cart.length);
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

  changeCurrentSearchCategory(event: Event): void {
    const categoryName = (event.target as HTMLInputElement).value;
    console.log('changing ' + categoryName);
    this.currentSearchCategory = categoryName;
  }

  data: BaseProduct[] = [];

  searchProduct(): void {
    // this.productsService.getSearchedProductsByCategory('laptop', this.currentSearchCategory).subscribe(z => console.log(z));
    // console.log(this.searchPhrase);
    // console.log(this.currentSearchCategory);
    // this.productsService.fetchProductsByCategory(this.searchPhrase, this.currentSearchCategory).subscribe(data => {
    //     this.data = data;
    //     this.productsService.setData(data);
    // });
    if (this.searchPhrase) {
      const params: Params = {};
      params.query = this.searchPhrase;
      if (this.currentSearchCategory) {
        params.category = this.currentSearchCategory;
      }

      params.page = 1;
      this.router.navigate(['/search'], {
        queryParams: params
      });
    }
  }
}
