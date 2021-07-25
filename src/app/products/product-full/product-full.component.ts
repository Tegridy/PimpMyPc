import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pmp-product-full',
  templateUrl: './product-full.component.html',
  styleUrls: ['./product-full.component.scss']
})
export class ProductFullComponent implements OnInit {

  showModal = false;
  productStars = 0;

  constructor() { }

  ngOnInit(): void {
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  onRatingChange($event: any): void {
    this.productStars = $event.rating;
  }
}
