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
  productStars = 0;
  productId = 0;

  product!: BaseProduct;
  productDetails: ProductDetail[] = [];
  productDetailsToFilter = ['id', 'title', 'description', 'price', 'imageUrl'];

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getProductId();

    this.productsService.getProductById(this.productId).subscribe((product) => {
      this.product = product;
      this.getProductDetails();
      this.filterProductParams();
    });
  }

  getProductId(): void {
    this.productId = this.route.snapshot.params.id;
  }

  getProductDetails(): void {
    for (let i = 0; i < Object.keys(this.product).length; i++) {
      this.productDetails.push(
        new ProductDetail(
          Object.keys(this.product)[i],
          Object.values(this.product)[i]
        )
      );
    }
  }

  addProductToCart() {
    this.cartService.changeCart(this.product);
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  filterProductParams(): void {
    this.productDetails = this.productDetails.filter(
      (productDetail) =>
        !this.productDetailsToFilter.includes(productDetail.key)
    );
  }

  showFullText(): void {
    this.showFullDescription = !this.showFullDescription;
  }
}
