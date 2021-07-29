import { ProductsCategoryComponent } from './products-category/products-category.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'category', component: ProductsCategoryComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class LoginRoutingModule {
  static components = [ ProductsCategoryComponent ];
}