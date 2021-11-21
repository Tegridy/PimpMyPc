import {Component, OnInit} from '@angular/core';
import {categories} from './Categories';
import {CategoriesService} from '../services/categories.service';
import {Params, Router} from '@angular/router';
import {ProductsService} from '../services/products.service';
import {BaseProduct} from '../../shared/model/BaseProduct';

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

    constructor(private categoryService: CategoriesService, private router: Router, private productsService: ProductsService) {
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
        this.productsService.fetchProductsByCategory(this.searchPhrase, this.currentSearchCategory).subscribe(data => {
            this.data = data;
            this.productsService.setData(data);
        });

        const q: Params = {};
        q.query = this.searchPhrase;
        if (this.currentSearchCategory) {
            q.category = this.currentSearchCategory;
        }

        this.router.navigate(['/search'], {
            queryParams: q
        });
    }
}
