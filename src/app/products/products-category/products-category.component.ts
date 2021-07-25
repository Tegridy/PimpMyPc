import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

@Component({
  selector: 'pmp-products-category',
  templateUrl: './products-category.component.html',
  styleUrls: ['./products-category.component.scss']
})
export class ProductsCategoryComponent implements OnInit {

  showProductsInListView = false;
  showModal = false;

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  changeProductsView(): void {
    this.showProductsInListView = !this.showProductsInListView;
    setInterval(() => console.log(this.showProductsInListView),5000);
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }
}
