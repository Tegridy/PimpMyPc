import { ProductsService } from './services/products.service';
import { ProductsModule } from './../products/products.module';
import { InformationsModule } from './../informations/informations.module';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PmpRoutingModule } from './../pmp-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxGlideModule } from 'ngx-glide';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    SharedModule,
    PmpRoutingModule,
    ProductsModule,
    InformationsModule,
    FormsModule,
    NgxPaginationModule,
    NgxGlideModule,
  ],
  exports: [NavbarComponent, FooterComponent],
  providers: [ProductsService],
})
export class CoreModule {}
