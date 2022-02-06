import { SharedModule } from 'src/app/shared/shared.module';
import { LoadingDotsComponent } from './../shared/loading-dots/loading-dots.component';
import { RegisterRoutingModule } from './register-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [RegisterRoutingModule.components],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    ToastrModule.forRoot(),
  ],
})
export class RegisterModule {}
