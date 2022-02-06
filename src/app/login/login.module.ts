import { SharedModule } from 'src/app/shared/shared.module';
import { LoadingDotsComponent } from './../shared/loading-dots/loading-dots.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [LoginRoutingModule.components],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
})
export class LoginModule {}
