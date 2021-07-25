import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'pmp-product-small',
  templateUrl: './product-small.component.html',
  styleUrls: ['./product-small.component.scss']
})
export class ProductSmallComponent implements OnInit {

  @Input()
  listView = false;
  @Input()
  itemParams: string[] = [];

  constructor() { }

  ngOnInit(): void {
 setInterval(() => console.log(this.listView), 5000);
  }

}
