import {NgxPaginationModule} from 'ngx-pagination';
import {SharedModule} from 'src/app/shared/shared.module';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchRoutingModule} from './search-routing.module';

@NgModule({
  declarations: [SearchRoutingModule.components],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    SharedModule,
    SearchRoutingModule,
    NgxPaginationModule,
  ],
})
export class SearchModule {
}
