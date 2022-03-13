import {ReactiveFormsModule} from '@angular/forms';
import {NewsletterComponent} from './newsletter/newsletter.component';
import {InformationsRoutingModule} from './informations-routing.module';

import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [NewsletterComponent, InformationsRoutingModule.components],
  imports: [CommonModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [InformationsRoutingModule, NewsletterComponent],
})
export class InformationsModule {
}
