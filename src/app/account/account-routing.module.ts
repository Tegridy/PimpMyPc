import {MyOrdersComponent} from './my-orders/my-orders.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {AccountComponent} from './account.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderDetailsComponent} from './order-details/order-details.component';


const routes: Routes = [
  {
    path: '', component: AccountComponent, children: [
      {path: 'orders', component: MyOrdersComponent},
      {path: 'settings', component: AccountSettingsComponent},
      {path: 'orders/:id', component: OrderDetailsComponent},
      {path: '', redirectTo: 'orders', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
  static components = [AccountComponent, AccountSettingsComponent, MyOrdersComponent];
}
