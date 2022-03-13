import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaginationInstance} from 'ngx-pagination';

@Component({
  selector: 'pmp-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: [],
})
export class PaginationComponent implements OnInit {
  @Input()
  config: PaginationInstance = {itemsPerPage: 9, currentPage: 1};

  @Output()
  pageChangeEvent = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }
}
