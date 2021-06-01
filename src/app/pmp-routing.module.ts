import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UserSignInComponent} from './user-sign-in/user-sign-in.component';
import {UserSignUpComponent} from './user-sign-up/user-sign-up.component';
import {ProductsCategoryComponent} from './products-category/products-category.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {BasketComponent} from './basket/basket.component';
import {AccountComponent} from './account/account.component';
import {MyOrdersComponent} from './account/my-orders/my-orders.component';
import {AccountSettingsComponent} from './account/account-settings/account-settings.component';
import {ReturnsComponent} from './account/returns/returns.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: UserSignInComponent },
  { path: 'register', component: UserSignUpComponent },
  { path: 'category', component: ProductsCategoryComponent },
  { path: 'account', component: AccountComponent, children: [
      { path: 'orders', component: MyOrdersComponent },
      { path: 'returns', component: ReturnsComponent },
      { path: 'settings', component: AccountSettingsComponent },
      { path: '', redirectTo: 'orders', pathMatch: 'full'}
    ] },
  { path: 'basket', component: BasketComponent },
  // { path: 'build' }
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PmpRoutingModule { }
