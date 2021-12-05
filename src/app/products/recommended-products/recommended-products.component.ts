import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'pmp-recommended-products',
  templateUrl: './recommended-products.component.html',
  styleUrls: ['./recommended-products.component.scss']
})
export class RecommendedProductsComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    // new Glide('.glide', { autoplay: 5000 }).mount();
  }

}
