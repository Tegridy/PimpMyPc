import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../core/services/products.service';
import {BaseProduct} from '../../shared/model/BaseProduct';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'pmp-product-full',
  templateUrl: './product-full.component.html',
  styleUrls: ['./product-full.component.scss']
})
export class ProductFullComponent implements OnInit {

  showModal = false;
  productStars = 0;
  productId = 0;

  product!: BaseProduct;

  constructor(private productsService: ProductsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params.id;
      console.log(this.productId);
    });

    this.productsService.getProductById(this.productId).subscribe(
      product => {
        this.product = product;
        console.log(product);
      }
    );
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  onRatingChange($event: any): void {
    this.productStars = $event.rating;
  }
}
