import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RegulationsComponent } from './regulations/regulations.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    NewsletterComponent,
    PrivacyPolicyComponent,
    RegulationsComponent,
    AboutUsComponent,
    ContactUsComponent
  ],
  imports: [
    CommonModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [
    NewsletterComponent,
    PrivacyPolicyComponent,
    RegulationsComponent,
    AboutUsComponent,
    ContactUsComponent
  ]
})
export class InformationsModule { }
