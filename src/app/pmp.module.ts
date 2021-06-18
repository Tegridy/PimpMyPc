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
import { BasketComponent } from './basket/basket.component';
import { AccountComponent } from './account/account.component';
import { MyOrdersComponent } from './account/my-orders/my-orders.component';
import { AccountSettingsComponent } from './account/account-settings/account-settings.component';
import { ReturnsComponent } from './account/returns/returns.component';
import { ModalComponent } from './shared/modal/modal.component';
import { AboutUsComponent } from './about-us/about-us.component';

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
    PageNotFoundComponent,
    BasketComponent,
    AccountComponent,
    MyOrdersComponent,
    AccountSettingsComponent,
    ReturnsComponent,
    ModalComponent,
    AboutUsComponent
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
