import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './core/home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProductsCategoryComponent} from './products/products-category/products-category.component';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';
import {BasketComponent} from './orders/basket/basket.component';
import {AccountComponent} from './account/account.component';
import {MyOrdersComponent} from './account/my-orders/my-orders.component';
import {AccountSettingsComponent} from './account/account-settings/account-settings.component';
import {ReturnsComponent} from './account/returns/returns.component';
import {AboutUsComponent} from './informations/about-us/about-us.component';
import {RegulationsComponent} from './informations/regulations/regulations.component';
import {PrivacyPolicyComponent} from './informations/privacy-policy/privacy-policy.component';
import {ContactUsComponent} from './informations/contact-us/contact-us.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
//  { path: 'login', component: UserSignInComponent },
 // { path: 'register', component: UserSignUpComponent },
//  { path: 'category', component: ProductsCategoryComponent },
  // { path: 'account', component: AccountComponent, children: [
  //     { path: 'orders', component: MyOrdersComponent },
  //     { path: 'returns', component: ReturnsComponent },
  //     { path: 'settings', component: AccountSettingsComponent },
  //     { path: '', redirectTo: 'orders', pathMatch: 'full'}
  //   ] },
  { path: 'basket', component: BasketComponent },
 // { path: 'about-us', component: AboutUsComponent },
 // { path: 'regulations', component: RegulationsComponent },
 // { path: 'privacy-policy', component: PrivacyPolicyComponent },
 // { path: 'contact-us', component: ContactUsComponent },
  // { path: 'build' }
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class PmpRoutingModule { }
