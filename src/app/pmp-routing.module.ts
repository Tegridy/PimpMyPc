import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UserSignInComponent} from './user-sign-in/user-sign-in.component';
import {UserSignUpComponent} from './user-sign-up/user-sign-up.component';
import {ProductsCategoryComponent} from './products-category/products-category.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {BasketComponent} from './basket/basket.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: UserSignInComponent},
  { path: 'register', component: UserSignUpComponent},
  { path: 'category', component: ProductsCategoryComponent},
  // { path: 'account' },
  // { path: 'orders'},
  // { path: 'account-settings' },
  { path: 'basket', component: BasketComponent },
  // { path: 'build' }
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PmpRoutingModule { }
