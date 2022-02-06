import { CartService } from './../../core/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { BaseProduct } from '../../shared/model/BaseProduct';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductDetail } from '../../shared/model/ProductDetail';

@Component({
  selector: 'pmp-product-full',
  templateUrl: './product-full.component.html',
  styleUrls: ['./product-full.component.scss'],
})
export class ProductFullComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {
    this.product = { title: 'Product title', price: 0, id: -1, quantity: -1 };
  }

  showModal = false;
  productStars = 0;
  productId = 0;

  product: BaseProduct;
  productDetails: ProductDetail[] = [];
  productParamsToFilter = ['id', 'title', 'description', 'price', 'imageUrl'];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params.id;
    });

    this.productsService.getProductById(this.productId).subscribe((product) => {
      this.product = product;
      for (let i = 0; i < Object.keys(this.product).length; i++) {
        this.productDetails.push(
          new ProductDetail(
            Object.keys(this.product)[i],
            Object.values(this.product)[i]
          )
        );
      }
      this.filterProductParams();
    });
  }

  addProductToCart() {
    this.cartService.addProductToCart(this.product);
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  onRatingChange($event: any): void {
    this.productStars = $event.rating;
  }

  filterProductParams(): void {
    this.productDetails = this.productDetails.filter(
      (pd) => !this.productParamsToFilter.includes(pd.key)
    );
  }
}
