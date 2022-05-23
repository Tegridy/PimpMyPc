import { CartService } from './../../core/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { BaseProduct } from '../../shared/model/BaseProduct';
import { ActivatedRoute } from '@angular/router';
import { ProductDetail } from '../../shared/model/ProductDetail';

@Component({
  selector: 'pmp-product-full',
  templateUrl: './product-full.component.html',
  styleUrls: [],
})
export class ProductFullComponent implements OnInit {
  showModal = false;
  showFullDescription = false;
  loading = false;
  private productId = 0;

  product!: BaseProduct;
  productDetails!: ProductDetail[] | undefined;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getProductId();

    this.productsService.getProductById(this.productId).subscribe((product) => {
      this.product = product;
      this.productDetails = product.attributes;
    });
  }

  private getProductId(): void {
    this.productId = this.route.snapshot.params.id;
  }

  addProductToCart(): void {
    this.cartService.addProductToCart(this.product);
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  showFullText(): void {
    this.showFullDescription = !this.showFullDescription;
  }
}
