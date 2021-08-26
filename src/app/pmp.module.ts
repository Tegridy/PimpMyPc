import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { InformationsModule } from './informations/informations.module';
import { AccountModule } from './account/account.module';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PmpRoutingModule } from './pmp-routing.module';
import { PmpComponent } from './pmp.component';


@NgModule({
  declarations: [
    PmpComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    BrowserModule,
    PmpRoutingModule,
    AccountModule,
    InformationsModule,
    OrdersModule,
    ProductsModule,
    CoreModule,
    SharedModule,
    LoginModule,
    RegisterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [PmpComponent]
})
export class PmpModule { }
