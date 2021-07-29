import { AccountModule } from './account/account.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PmpRoutingModule } from './pmp-routing.module';
import { PmpComponent } from './pmp.component';
import {StarRatingModule} from 'angular-star-rating';
import {FormsModule} from '@angular/forms';
import { InformationsModule } from './informations/informations.module';


@NgModule({
  declarations: [
    PmpComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    BrowserModule,
    PmpRoutingModule,
    StarRatingModule.forRoot(),
    FormsModule,
    CoreModule,
    SharedModule,
    LoginModule,
    RegisterModule,
    OrdersModule,
    ProductsModule,
    AccountModule,
    InformationsModule
  ],
  providers: [],
  bootstrap: [PmpComponent]
})
export class PmpModule { }
