import { SliderComponent } from './slider/slider.component';
import { ModalComponent } from './modal/modal.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingModule } from 'angular-star-rating';
import { SpinnerComponent } from './spinner/spinner.component';
import { ProductSmallComponent } from './product-small/product-small.component';
import { RouterModule } from '@angular/router';
import { LoadingDotsComponent } from './loading-dots/loading-dots.component';

@NgModule({
  declarations: [
    ModalComponent,
    SliderComponent,
    SpinnerComponent,
    ProductSmallComponent,
    LoadingDotsComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, StarRatingModule.forRoot(), RouterModule],
  exports: [
    ModalComponent,
    SliderComponent,
    SpinnerComponent,
    ProductSmallComponent,
    LoadingDotsComponent,
  ],
})
export class SharedModule {}
