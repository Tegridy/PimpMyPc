import { InformationsRoutingModule } from './informations-routing.module';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    InformationsRoutingModule.components
  ],
  imports: [
    CommonModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [
    InformationsRoutingModule
  ]
})
export class InformationsModule { }
