import { ProductsModule } from './../products/products.module';
import { SliderComponent } from './slider/slider.component';
import { ModalComponent } from './modal/modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StarRatingModule } from 'angular-star-rating';

@NgModule({
  declarations: [ModalComponent, SliderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, StarRatingModule.forRoot(), ProductsModule],
  exports: [ModalComponent, SliderComponent],
})
export class SharedModule {}
