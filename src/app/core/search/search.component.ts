import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../services/products.service';
import {BaseProduct} from '../../shared/model/BaseProduct';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'pmp-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchedProducts: BaseProduct[] = [];

  constructor(private productService: ProductsService, private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      this.productService.fetchProductsByCategory(params.query, params.category).subscribe(prod => this.searchedProducts = prod);
    });
  }

  ngOnInit(): void {
  }

}
