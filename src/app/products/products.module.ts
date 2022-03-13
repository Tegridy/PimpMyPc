import {NgxPaginationModule} from 'ngx-pagination';
import {SharedModule} from 'src/app/shared/shared.module';
import {ProductsCategoryComponent} from './products-category/products-category.component';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsRoutingModule} from './products-routing.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [ProductsRoutingModule.components],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    NgxPaginationModule,
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    FormsModule,
  ],
  exports: [ProductsCategoryComponent],
})
export class ProductsModule {
}
