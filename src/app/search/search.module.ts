import { ProductsModule } from './../products/products.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CoreModule } from './../core/core.module';
import { PmpModule } from './../pmp.module';
import { SearchComponent } from './search.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';

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
export class SearchModule {}
