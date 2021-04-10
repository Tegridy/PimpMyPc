import { Component, OnInit } from '@angular/core';
import Glide from '@glidejs/glide';

@Component({
  selector: 'pmp-bestsellers',
  templateUrl: './bestsellers.component.html',
  styleUrls: ['./bestsellers.component.scss']
})
export class BestsellersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    new Glide('.glide').mount();
  }

}
