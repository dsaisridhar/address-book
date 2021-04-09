import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  openModalLocal = false;
  @Output() closeModal = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  openModal() {
    this.openModalLocal = true;
  }

  close() {
    this.openModalLocal = false;
    this.closeModal.emit();
  }

}
