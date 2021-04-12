import { Component, OnInit } from '@angular/core';
import Glide from '@glidejs/glide';

@Component({
  selector: 'pmp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    new Glide('#movies-slider', { autoplay: 5000}).mount();
    new Glide('#bestsellers-slider', { autoplay: 5000 }).mount();
  }

}
