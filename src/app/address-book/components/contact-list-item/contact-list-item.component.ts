import { Component, Input, OnInit } from '@angular/core';
import { IContact } from 'src/app/address-book/_models';

@Component({
  selector: 'app-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.scss']
})
export class ContactListItemComponent implements OnInit {

  @Input() contact: IContact;

  constructor() { }

  ngOnInit(): void {
  }

}
