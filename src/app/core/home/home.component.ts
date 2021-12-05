import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../services/products.service';
import {BaseProduct} from '../../shared/model/BaseProduct';
import {IMovie} from '../../shared/model/IMovie';
import {Observable, of} from 'rxjs';


@Component({
  selector: 'pmp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  slidesPerView = 6;
  moviesSlider: any;
  bestsellersSlider: any;

  bestsellersProducts: BaseProduct[] = [];
  x: Observable<BaseProduct[]> = of([]);
  movies: IMovie[] = [];

  constructor(private productsService: ProductsService) {
    // this.movies.push({title: 'Title 1', thumbUrl: 'https://img.youtube.com/vi/lezcu2KavS0/hqdefault.jpg'});
    // this.movies.push({title: 'Title 2', thumbUrl: 'https://img.youtube.com/vi/lezcu2KavS0/hqdefault.jpg'});
    // this.movies.push({title: 'Title 3', thumbUrl: 'https://img.youtube.com/vi/lezcu2KavS0/hqdefault.jpg'});
    // this.movies.push({title: 'Title 4', thumbUrl: 'https://img.youtube.com/vi/lezcu2KavS0/hqdefault.jpg'});
    // this.movies.push({title: 'Title 1', thumbUrl: 'https://img.youtube.com/vi/lezcu2KavS0/hqdefault.jpg'});
    // this.movies.push({title: 'Title 2', thumbUrl: 'https://img.youtube.com/vi/lezcu2KavS0/hqdefault.jpg'});
    // this.movies.push({title: 'Title 3', thumbUrl: 'https://img.youtube.com/vi/lezcu2KavS0/hqdefault.jpg'});
    // this.movies.push({title: 'Title 4', thumbUrl: 'https://img.youtube.com/vi/lezcu2KavS0/hqdefault.jpg'});
    // this.x = this.productsService.getTopSellingProducts();

  }

  ngOnInit(): void {

    // this.productsService.getTopSellingProducts().subscribe(prod => {
    //   this.bestsellersProducts = prod;
    //   new Glide('.glide').mount();
    // });
    this.x = this.productsService.getTopSellingProducts();


  }


}
