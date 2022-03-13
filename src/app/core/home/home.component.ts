import {movies} from './Movies';
import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../services/products.service';
import {BaseProduct} from '../../shared/model/BaseProduct';
import {Movie} from '../../shared/model/Movie';

@Component({
  selector: 'pmp-home',
  templateUrl: './home.component.html',
  styleUrls: [],
})
export class HomeComponent implements OnInit {
  slidesPerView = 7;
  showBullets = false;
  bound = true;

  errorMessage = '';

  moviesSlider: any;
  bestsellersSlider: any;

  bestsellersProducts: BaseProduct[] = [];
  ourChoiceProducts: BaseProduct[] = [];
  movies: Movie[] = [];
  newestProduct!: BaseProduct;

  constructor(private productsService: ProductsService) {
    this.movies = movies;
  }

  ngOnInit(): void {
    this.productsService.getTopSellingProducts().subscribe(
      (bestsellers) => (this.bestsellersProducts = bestsellers),
      (error) => (this.errorMessage = error)
    );
    this.productsService.getOurChoice().subscribe(
      (ourChoice) => (this.ourChoiceProducts = ourChoice),
      (error) => (this.errorMessage = error)
    );
    this.productsService.getNewestProduct().subscribe(
      (newestProduct) => (this.newestProduct = newestProduct),
      (error) => (this.errorMessage = error)
    );
  }
}
