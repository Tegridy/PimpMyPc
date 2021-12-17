import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../services/products.service';
import {BaseProduct} from '../../shared/model/BaseProduct';
import {IMovie} from '../../shared/model/IMovie';


@Component({
  selector: 'pmp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Slider configs
  slidesPerView = 7;
  showBullets = false;
  bound = true;


  moviesSlider: any;
  bestsellersSlider: any;

  bestsellersProducts: BaseProduct[] = [];
  ourChoiceProducts: BaseProduct[] = [];
  movies: IMovie[] = [];
  newestProduct!: BaseProduct;


  constructor(private productsService: ProductsService) {
    this.movies.push({title: 'How to build PC', thumbUrl: 'https://img.youtube.com/vi/v7MYOpFONCU/hqdefault.jpg'});
    this.movies.push({title: 'How to choose a graphics card', thumbUrl: 'https://img.youtube.com/vi/S1xkLWaMWxQ/hqdefault.jpg'});
    this.movies.push({title: 'The Monitor Buying Guide', thumbUrl: 'https://img.youtube.com/vi/9ZwCDBBwSdU/hqdefault.jpg'});
    this.movies.push({title: 'How to CORRECTLY choose your PC Parts', thumbUrl: 'https://img.youtube.com/vi/j_DcWgxMZ3k/hqdefault.jpg'});
    this.movies.push({title: 'The BEST Smartphones of 2021', thumbUrl: 'https://img.youtube.com/vi/kwkjQRT42Qk/hqdefault.jpg'});
    this.movies.push({
      title: 'Galaxy S21 Ultra vs iPhone 12 Pro Test',
      thumbUrl: 'https://img.youtube.com/vi/qxRpzr-862Q/hqdefault.jpg'
    });
    this.movies.push({title: 'The Fastest Gaming PC is now AMD!', thumbUrl: 'https://img.youtube.com/vi/Qa0jZnrQrIA/hqdefault.jpg'});
    this.movies.push({title: 'Best Prebuilt Gaming PC 2021', thumbUrl: 'https://img.youtube.com/vi/hEE3s9QLfLE/hqdefault.jpg'});
  }

  ngOnInit(): void {
    this.productsService.getTopSellingProducts().subscribe(bestsellers => this.bestsellersProducts = bestsellers);
    this.productsService.getOurChoice().subscribe(ourChoice => this.ourChoiceProducts = ourChoice);
    this.productsService.getNewestProduct().subscribe(newestProduct => this.newestProduct = newestProduct);

    this.productsService.getProductById(40).subscribe(x => console.log(x));
  }


}
