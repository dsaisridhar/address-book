import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IContact } from 'src/app/address-book/_models';
import * as fromAddressBook from './address-book.reducer';

export const selectAddressBookFeature = createFeatureSelector<fromAddressBook.State>(
  fromAddressBook.addressBookFeatureKey
);

export const contactListSelector = createSelector(
  selectAddressBookFeature,
  fromAddressBook.selectAll
);

export const initialContactListSelector = createSelector(
  selectAddressBookFeature,
  (state: fromAddressBook.State) => state.initialContactList
);

export const updatedContactListSelector = createSelector(
  selectAddressBookFeature,
  (state: fromAddressBook.State) => state.updatedContactList
);
