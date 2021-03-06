import { Component, OnInit } from '@angular/core';
import Glide from '@glidejs/glide';

@Component({
  selector: 'pmp-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    new Glide('#slider').mount();
  }

}
