import {CartComponent} from './cart/cart.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CheckoutComponent} from './checkout/checkout.component';

const routes: Routes = [
  {path: 'cart', component: CartComponent},
  {path: 'checkout', component: CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {
  static components = [CartComponent, CheckoutComponent];
}
