import { Injectable } from '@angular/core';
import { Store , select} from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, withLatestFrom } from 'rxjs/operators';

import { IContact, UpdateContactList } from 'src/app/address-book/_models';
import { AppState } from 'src/app/store';
import * as AddressBookActions from './address-book.actions';
import { initialContactListSelector } from './address-book.selectors';

import { AddressBookService } from 'src/app/address-book/services/address-book.service';

@Injectable()
export class AddressBookEffects {
  getContacts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AddressBookActions.getContactList),
      mergeMap((action) =>
        this.addressBookService.getContacts().pipe(
          map((data: IContact[]) =>
            AddressBookActions.getContactListSuccess({ contactList: data })
          )
        )
      )
    );
  });

  deleteContacts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AddressBookActions.deleteMultipleContacts),
      mergeMap((action) => {
        const deleteableContacts = action.contacts.filter((contact: IContact) => !contact.isNew && contact.selected);
        const ids = deleteableContacts.map(contact => contact.id);
        /*
         *  Only delete contacts with ids in the API(ignore new contacts)
         *  New Contacts will be deleted as part of ngRX/entity
         */
        return this.addressBookService.deleteContacts(ids).pipe(
          map((data: string[]) =>
            AddressBookActions.deleteMultipleContactsSuccess({ contacts: action.contacts })
          )
        );
      })
    );
  });

  updateAll$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AddressBookActions.updateAllContactList),
      withLatestFrom(this.store$.pipe(select(initialContactListSelector))),
      mergeMap(([action, initialContactList]) =>
        this.addressBookService.addUpdateMultiple(initialContactList, action.contacts).pipe(
          map((data: UpdateContactList) => {
            return AddressBookActions.updateAllContactListSuccess({ updatedContacts: data});
          })
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private addressBookService: AddressBookService
  ) {}
}
