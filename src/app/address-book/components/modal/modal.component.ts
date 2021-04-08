import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  openModalLocal = false;
  @Output() close = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  openModal() {
    this.openModalLocal = true;
  }

  closeModal() {
    this.openModalLocal = false;
    this.close.emit();
  }

}
