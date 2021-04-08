import {
  ActionReducerMap,
} from '@ngrx/store';

import * as fromAddressBook from 'src/app/address-book/state/address-book.reducer';

export interface AppState {
  [fromAddressBook.addressBookFeatureKey]: fromAddressBook.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromAddressBook.addressBookFeatureKey]: fromAddressBook.reducer,
};
