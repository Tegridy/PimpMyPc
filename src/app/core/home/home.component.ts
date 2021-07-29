import {AfterContentInit, AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import Glide from '@glidejs/glide';


@Component({
  selector: 'pmp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  slidesPerView = 6;
  moviesSlider: any;
  bestsellersSlider: any;

  constructor() {

  }

  ngOnInit(): void {
    this.moviesSlider = new Glide('#movies-slider', {
      perView: 6, bound: true, breakpoints: {
        1024: {
          perView: 2,
          bound: true
        }
      }
    }).mount();
    this.bestsellersSlider = new Glide('#bestsellers-slider', {
      perView: 6, bound: true, breakpoints: {
        1024: {
          perView: 2,
          bound: true
        }
      }
    }).mount();

  }
}
