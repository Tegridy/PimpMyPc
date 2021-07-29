import { ReturnsComponent } from './returns/returns.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AccountComponent } from './account.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'account', component: AccountComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AccountRoutingModule {
  static components = [ AccountComponent, AccountSettingsComponent, MyOrdersComponent, ReturnsComponent ];
}