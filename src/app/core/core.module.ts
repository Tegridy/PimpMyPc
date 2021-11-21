import {CategoriesService} from './services/categories.service';
import {ProductsService} from './services/products.service';
import {ProductsModule} from './../products/products.module';
import {InformationsModule} from './../informations/informations.module';
import {FooterComponent} from './footer/footer.component';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './navbar/navbar.component';
import {PmpRoutingModule} from './../pmp-routing.module';
import {SharedModule} from 'src/app/shared/shared.module';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchComponent} from './search/search.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, HomeComponent, SearchComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    SharedModule,
    PmpRoutingModule,
    ProductsModule,
    InformationsModule,
    FormsModule,
  ],
  exports: [NavbarComponent, FooterComponent],
  providers: [ProductsService, CategoriesService],
})
export class CoreModule {
}
