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
import { ProductFullComponent } from './product-full/product-full.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import {StarRatingModule} from 'angular-star-rating';
import { ProductsCategoryComponent } from './products-category/products-category.component';
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';
import { UserSignInComponent } from './user-sign-in/user-sign-in.component';
import {FormsModule} from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    PmpComponent,
    NavbarComponent,
    HomeComponent,
    RecommendedProductsComponent,
    ProductSmallComponent,
    SliderComponent,
    FooterComponent,
    ProductFullComponent,
    NewsletterComponent,
    ProductsCategoryComponent,
    UserSignUpComponent,
    UserSignInComponent,
    PageNotFoundComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    BrowserModule,
    PmpRoutingModule,
    StarRatingModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [PmpComponent]
})
export class PmpModule { }
