import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './core/home/home.component';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';
import {BasketComponent} from './orders/basket/basket.component';
import {AboutUsComponent} from './informations/about-us/about-us.component';
import {RegulationsComponent} from './informations/regulations/regulations.component';
import {PrivacyPolicyComponent} from './informations/privacy-policy/privacy-policy.component';
import {ContactUsComponent} from './informations/contact-us/contact-us.component';
import {SearchComponent} from './core/search/search.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  {path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)},
  {path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
  {path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)},
  // { path: 'about', loadChildren: () => import('./informations/informations.module').then(m => m.InformationsModule) },
  {path: 'categories', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)},
  {path: 'products/:id', loadChildren: () => import('./product/product.module').then(m => m.ProductModule)},
  {path: 'basket', component: BasketComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'regulations', component: RegulationsComponent},
  {path: 'privacy-policy', component: PrivacyPolicyComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'search', component: SearchComponent},
  // { path: 'build' }
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class PmpRoutingModule {
}
