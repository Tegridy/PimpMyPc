import { ProductsCategoryComponent } from './products-category/products-category.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '', children: [
        { path: '**', component: ProductsCategoryComponent }
  ] }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ProductsRoutingModule {
  static components = [ ProductsCategoryComponent ];
}