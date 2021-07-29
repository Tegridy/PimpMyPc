import { ProductsModule } from './../products/products.module';
import { SliderComponent } from './slider/slider.component';
import { ModalComponent } from './modal/modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



@NgModule({
  declarations: [
    ModalComponent,
    SliderComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    ProductsModule
  ],
  exports: [
    ModalComponent,
    SliderComponent
  ]
})
export class SharedModule {}
