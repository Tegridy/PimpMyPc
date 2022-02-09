import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'pmp-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input()
  config: any = {};

  @Output()
  pageChangeEvent = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}
}
