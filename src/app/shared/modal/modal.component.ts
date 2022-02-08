import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pmp-modal',
  templateUrl: './modal.component.html',
  styleUrls: [],
})
export class ModalComponent implements OnInit {
  @Input()
  showModal = false;

  @Input()
  modalName = '';

  @Output() modalToggleEvent: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  toggleModal(): void {
    this.showModal = !this.showModal;
    this.modalToggleEvent.emit(this.showModal);
  }
}
