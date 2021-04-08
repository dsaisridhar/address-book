import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, take, tap } from 'rxjs/operators';
import * as uuid from 'uuid';

import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store';
import * as selectors from 'src/app/address-book/state/address-book.selectors';
import * as actions from 'src/app/address-book/state/address-book.actions';

import { ModalComponent } from 'src/app/address-book/components/modal/modal.component';
import { IContact, SortDir, UpdateContactList } from 'src/app/address-book/_models';

interface Sort {
  field: string;
  sortDir: SortDir;
  isAsc?: boolean;
}

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit, OnDestroy {

  contactList$: Observable<IContact[]>;
  updatedContactList$: Observable<UpdateContactList>;
  contactsForm: FormGroup;
  isAllChecked = false;
  currentSort: Sort = { field: '', sortDir: 'desc', isAsc: false };

  @ViewChild('modal') modal: ModalComponent;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {
    this.contactsForm = this.formBuilder.group({
      allChecked: [false],
      contactsArray: this.formBuilder.array([])
    });
  }

  get contactsArrayForm() {
    return this.contactsForm.get('contactsArray') as FormArray;
  }

  ngOnInit(): void {
    this.updatedContactList$ = this.store.pipe(
      select(selectors.updatedContactListSelector),
      tap(updatedList => {
        this.openModal();
      })
    );
    this.contactList$ = this.store.pipe(
      select(selectors.contactListSelector),
      distinctUntilChanged(),
      tap((contactList: IContact[]) => {
        const selectedItems = [];
        this.contactsArrayForm.clear();
        contactList.forEach((contact: IContact) => {
          if (contact.selected) {
            selectedItems.push(contact.id);
          }
          this.contactsArrayForm.controls.push(this.createContact(contact, contact.isNew));
        });

        this.isAllChecked = contactList.length > 0 && (selectedItems.length === contactList.length);
      }),
    );

    this.getContactList();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getContactList(): void {
    this.store.dispatch(
      actions.getContactList()
    );
  }

  addNewRow(): void {
    this.store.dispatch(
      actions.addToContactList({ contact: this.createContactObj(null, true) })
    );
  }

  updateField(ev, index: number): void {
    this.store.dispatch(
      actions.updateContactItem({
        update: {
          id: this.getIdByIndex(index),
          changes: {
            [ev.fieldName]: ev.value 
          }
        }
      })
    );
  }

  updateAll(): void {
    this.contactList$.pipe(take(1)).subscribe(contactList => {
      this.store.dispatch(
        actions.updateAllContactList({contacts: contactList })
      );
    });
  }

  deleteSelectedContacts(): void {
    this.contactList$.pipe(take(1)).subscribe(contactList => {
      const selectedItems = contactList.filter(c => c.selected);
      if (selectedItems.length > 0) {
        this.store.dispatch(
          actions.deleteMultipleContacts({ contacts: selectedItems })
        );
      }
    });
  }

  sortBy(fieldName): void {
    this.currentSort.isAsc = !this.currentSort.isAsc;
    this.currentSort = {field: fieldName, sortDir: this.currentSort.isAsc ? 'asc' : 'desc', isAsc: this.currentSort.isAsc };
    this.store.dispatch(
      actions.sortContactList({ fieldName, sortDir: this.currentSort.sortDir })
    );
  }

  toggleItem(isChecked, index): void {
    this.store.dispatch(
      actions.toggleItemSelection({ id: this.getIdByIndex(index), isChecked })
    );
  }

  toggleAll(ev: Event): void {
    ev.preventDefault();
    this.isAllChecked = !this.isAllChecked;
    this.store.dispatch(
      actions.toggleAllSelection({ isChecked: this.isAllChecked })
    );
  }

  openModal(): void {
    this.modal && this.modal.openModal();
  }

  onModalClose(): void {
    this.store.dispatch(
      actions.resetUpdatedList()
    );
  }

  getContactId(contact: FormArray): string {
    const id = contact.get('id').value;
    const isNew = contact.get('isNew').value;

    return ((id && !isNew) ? id : '');
  }

  private getIdByIndex(index: number): string {
    const item = this.contactsArrayForm.at(index).value;
    return item.id;
  }

  private createContact(contact: IContact | null, isNew: boolean): FormGroup {
    return this.formBuilder.group(this.createContactObj(contact, isNew));
  }

  private createContactObj(contact: IContact | null, isNew: boolean): IContact {
    const contactObj: any = contact || {};
    const tempId = uuid().substring(0, 5);

    return {
      id: (isNew && !contactObj.id) ? tempId : contactObj.id,
      name: contactObj.name || '',
      location: contactObj.location || '',
      office: contactObj.office || '',
      officePhone: contactObj.officePhone || '',
      cellPhone: contactObj.cellPhone || '',
      selected: contactObj.selected || false,
      isNew,
    };
  }

}
