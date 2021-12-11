import {AccountRoutingModule} from './account-routing.module';
import {SharedModule} from './../shared/shared.module';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../core/interceptors/auth.interceptor';


@NgModule({
  declarations: [
    AccountRoutingModule.components
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]
})

export class AccountModule {
}
