import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import * as uuid from 'uuid';

import { IContact, UpdateContactList } from 'src/app/address-book/_models';
import * as utils from 'src/app/address-book/utils/address-book-utils';

const contactsList: IContact[] = [
  {
    id: 'ght6bapi',
    name: 'John Smith',
    location: 'Palo Alto',
    office: 'C-103',
    officePhone: '7323334444',
    cellPhone: '1234567890',
    selected: null,
  },
  {
    id: 'yiuy6bapi',
    name: 'Aaron Johnson',
    location: 'New York',
    office: '208',
    officePhone: '9192224444',
    cellPhone: '',
    selected: null,
  },
  {
    id: 'vbnbbapi',
    name: 'Cara Stevens',
    location: 'Atlanta',
    office: '1048',
    officePhone: '',
    cellPhone: '9826785678',
    selected: null,
  }
];

@Injectable({
  providedIn: 'root'
})
export class AddressBookService {

  constructor() { }

  getContacts(): Observable<IContact[]> {
    // Call API to get list of contacts
    return of(contactsList);
  }

  saveContact(contact: IContact): Observable<IContact> {
    // Call API to save contact
    const savedContact = {...contact};
    savedContact.uiId = savedContact.id;
    savedContact.id = uuid().substring(0, 5) + 'api';
    return of(savedContact);
  }

  updateContact(id: string, contact: IContact) {
    const updatedContact = {...contact};
    return of(updatedContact );
  }

  deleteContacts(ids: string[]): Observable<string[]> {
    // Call API to delete multiple
    return of(ids);
  }

  addUpdateMultiple(initailList: IContact[], currentList: IContact[]): Observable<UpdateContactList> {
    const updatedList: UpdateContactList = utils.getUpdatedItems(initailList, currentList);
    const observables = [];

    updatedList.addedItems.forEach((contact: IContact) => {
      observables.push(this.saveContact(contact));
    });

    updatedList.updatedItems.forEach((contact: IContact) => {
      observables.push(this.updateContact(contact.id, contact));
    });

    if (observables.length === 0) {
      return of({ ...updatedList, updateSuccess: true });
    }

    return forkJoin(observables).pipe(
      map((newContacts: IContact[]) => {
        updatedList.newContactList = utils.getNewContactList(currentList, newContacts);
        updatedList.updateSuccess = true;
        return updatedList;
      })
    );
  }
}
