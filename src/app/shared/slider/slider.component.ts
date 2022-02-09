import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../model/Movie';
import { BaseProduct } from '../model/BaseProduct';

@Component({
  selector: 'pmp-slider',
  templateUrl: './slider.component.html',
  styleUrls: [],
})
export class SliderComponent implements OnInit {
  @Input() bestsellers: BaseProduct[] = [];
  @Input() movies: Movie[] = [];
  @Input() isMovie = false;

  constructor() {}

  ngOnInit(): void {}
}
