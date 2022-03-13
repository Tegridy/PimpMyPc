import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './core/home/home.component';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';
import {AboutUsComponent} from './informations/about-us/about-us.component';
import {RegulationsComponent} from './informations/regulations/regulations.component';
import {PrivacyPolicyComponent} from './informations/privacy-policy/privacy-policy.component';
import {ContactUsComponent} from './informations/contact-us/contact-us.component';
import {LoginGuard} from './core/guards/login.guard';
import {BuildPcComponent} from './build-pc/build-pc.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'account',
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'order',
    loadChildren: () =>
      import('./orders/orders.module').then((m) => m.OrdersModule),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'product/:id',
    loadChildren: () =>
      import('./product/product.module').then((m) => m.ProductModule),
  },
  {path: 'about-us', component: AboutUsComponent},
  {path: 'regulations', component: RegulationsComponent},
  {path: 'privacy-policy', component: PrivacyPolicyComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'build-pc', component: BuildPcComponent},
  {
    path: 'search',
    loadChildren: () =>
      import('./search/search.module').then((m) => m.SearchModule),
  },
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
  ],
  exports: [RouterModule],
})
export class PmpRoutingModule {
}
