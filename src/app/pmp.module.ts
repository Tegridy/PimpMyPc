import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PmpRoutingModule } from './pmp-routing.module';
import { PmpComponent } from './pmp.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RecommendedProductsComponent } from './home/recommended-products/recommended-products.component';
import { ProductSmallComponent } from './home/product-small/product-small.component';
import { SliderComponent } from './slider/slider.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    PmpComponent,
    NavbarComponent,
    HomeComponent,
    RecommendedProductsComponent,
    ProductSmallComponent,
    SliderComponent,
    FooterComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    BrowserModule,
    PmpRoutingModule
  ],
  providers: [],
  bootstrap: [PmpComponent]
})
export class PmpModule { }
