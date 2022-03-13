import {NgxPaginationModule} from 'ngx-pagination';
import {PaginationComponent} from './pagination/pagination.component';
import {ModalComponent} from './modal/modal.component';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpinnerComponent} from './spinner/spinner.component';
import {ProductSmallComponent} from './product-small/product-small.component';
import {RouterModule} from '@angular/router';
import {LoadingDotsComponent} from './loading-dots/loading-dots.component';
import {OrderStatusPipe} from './pipes/order-status.pipe';

@NgModule({
  declarations: [
    ModalComponent,
    SpinnerComponent,
    ProductSmallComponent,
    LoadingDotsComponent,
    OrderStatusPipe,
    PaginationComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, NgxPaginationModule, RouterModule],
  exports: [
    ModalComponent,
    SpinnerComponent,
    ProductSmallComponent,
    LoadingDotsComponent,
    OrderStatusPipe,
    PaginationComponent,
  ],
})
export class SharedModule {
}
