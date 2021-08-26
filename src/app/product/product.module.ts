import { InformationsModule } from './../informations/informations.module';
import { StarRatingModule } from 'angular-star-rating';
import { ProductFullComponent } from './product-full/product-full.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './products-routing.module';



@NgModule({
  declarations: [
    ProductFullComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    StarRatingModule.forRoot(),
    ProductRoutingModule,
    InformationsModule
  ]
})
export class ProductModule { }
