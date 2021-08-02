import { RecommendedProductsComponent } from './recommended-products/recommended-products.component';
import { ProductsCategoryComponent } from './products-category/products-category.component';
import { ProductFullComponent } from './product-full/product-full.component';
import { ProductSmallComponent } from './product-small/product-small.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductsRoutingModule } from './products-routing.module';



@NgModule({
  declarations: [
    ProductSmallComponent,
    ProductFullComponent,
    ProductsCategoryComponent,
    RecommendedProductsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ],
  exports: [ProductSmallComponent, ProductsCategoryComponent]
})
export class ProductsModule { }
