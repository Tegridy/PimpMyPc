import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PmpRoutingModule } from './pmp-routing.module';
import { PmpComponent } from './pmp.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RecommendedProductsComponent } from './products/recommended-products/recommended-products.component';
import { ProductSmallComponent } from './products/product-small/product-small.component';
import { SliderComponent } from './shared/slider/slider.component';
import { FooterComponent } from './core/footer/footer.component';
import { ProductFullComponent } from './products/product-full/product-full.component';
import { NewsletterComponent } from './informations/newsletter/newsletter.component';
import {StarRatingModule} from 'angular-star-rating';
import { ProductsCategoryComponent } from './products/products-category/products-category.component';
import { UserSignUpComponent } from './register/user-sign-up.component';
import { UserSignInComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { BasketComponent } from './orders/basket/basket.component';
import { AccountComponent } from './account/account.component';
import { MyOrdersComponent } from './account/my-orders/my-orders.component';
import { AccountSettingsComponent } from './account/account-settings/account-settings.component';
import { ReturnsComponent } from './account/returns/returns.component';
import { ModalComponent } from './shared/modal/modal.component';
import { AboutUsComponent } from './informations/about-us/about-us.component';
import { RegulationsComponent } from './informations/regulations/regulations.component';
import { PrivacyPolicyComponent } from './informations/privacy-policy/privacy-policy.component';
import { ContactUsComponent } from './informations/contact-us/contact-us.component';

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
    AboutUsComponent,
    RegulationsComponent,
    PrivacyPolicyComponent,
    ContactUsComponent
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
