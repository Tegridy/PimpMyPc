import { Component, Input, OnInit } from '@angular/core';
import { IMovie } from '../model/IMovie';
import { BaseProduct } from '../model/BaseProduct';

@Component({
  selector: 'pmp-slider',
  templateUrl: './slider.component.html',
  styleUrls: [],
})
export class SliderComponent implements OnInit {
  @Input() bestsellers: BaseProduct[] = [];
  @Input() movies: IMovie[] = [];
  @Input() isMovie = false;

  constructor() {}

  ngOnInit(): void {}
}
