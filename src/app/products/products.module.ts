import {NgxPaginationModule} from 'ngx-pagination';
import {SharedModule} from 'src/app/shared/shared.module';
import {RecommendedProductsComponent} from './recommended-products/recommended-products.component';
import {ProductsCategoryComponent} from './products-category/products-category.component';
import {ProductSmallComponent} from './product-small/product-small.component';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsRoutingModule} from './products-routing.module';
import {PaginationComponent} from './pagination/pagination.component';

@NgModule({
  declarations: [
    ProductSmallComponent,
    ProductsCategoryComponent,
    RecommendedProductsComponent,
    PaginationComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgxPaginationModule, CommonModule, ProductsRoutingModule, SharedModule],
  exports: [ProductSmallComponent, ProductsCategoryComponent],
})
export class ProductsModule {
}
