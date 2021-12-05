import {SliderComponent} from './slider/slider.component';
import {ModalComponent} from './modal/modal.component';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StarRatingModule} from 'angular-star-rating';
import {SpinnerComponent} from './spinner/spinner.component';
import {ProductSmallComponent} from './product-small/product-small.component';

@NgModule({
  declarations: [ModalComponent, SliderComponent, SpinnerComponent, ProductSmallComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, StarRatingModule.forRoot()],
  exports: [ModalComponent, SliderComponent, SpinnerComponent, ProductSmallComponent],
})
export class SharedModule {
}
