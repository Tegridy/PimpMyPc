import {InformationsModule} from './../informations/informations.module';
import {StarRatingModule} from 'angular-star-rating';
import {ProductFullComponent} from './product-full/product-full.component';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductRoutingModule} from './products-routing.module';


@NgModule({
  declarations: [
    ProductFullComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    StarRatingModule.forRoot(),
    ProductRoutingModule,
    InformationsModule
  ]
})
export class ProductModule {
}
