import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { IContact, UpdateContactList } from 'src/app/address-book/_models';
import * as utils from 'src/app/address-book/utils/address-book-utils';
import * as addressBookActions from 'src/app/address-book/state/address-book.actions';

export const addressBookFeatureKey = 'addressBook';

export interface State extends EntityState<IContact> {
  // additional entities state properties
  initialContactList: IContact[];
  updatedContactList: UpdateContactList;
  loadingContacts: boolean | null;
}

export const adapter: EntityAdapter<IContact> = createEntityAdapter<IContact>({});

export const initialUpdatedContactList = {
  addedItems: [],
  updatedItems: [],
  updateSuccess: null,
};

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  initialContactList: [],
  updatedContactList: initialUpdatedContactList,
  loadingContacts: null,
});

export const reducer = createReducer(
  initialState,
  /*
    Get Initial List of Contacts
  */
  on(addressBookActions.getContactList, (state, action) => {
    return { ...state, loadingContacts: true };
  }),
  on(addressBookActions.getContactListSuccess, (state, action) =>
    adapter.setAll(action.contactList, {
      ...state,
      initialContactList: action.contactList,
      loadingContacts: false,
    })
  ),

  /*
    Add Contact Row
  */
  on(addressBookActions.addToContactList, (state, action) => {
    return adapter.addOne(action.contact, state);
  }),

  /*
    Update Contact Rows
  */
  on(addressBookActions.updateContactItem, (state, action) =>
    adapter.updateOne(action.update, state)
  ),
  on(addressBookActions.updateAllContactListSuccess,  (state, action) => {
    const newState = {
      ...state,
      updatedContactList: action.updatedContacts,
    };

    if (action.updatedContacts.newContactList && action.updatedContacts.newContactList.length > 0) {
      return adapter.setAll(action.updatedContacts.newContactList, {
        ...newState,
        initialContactList: action.updatedContacts.newContactList,
      });
    }

    return newState;
  }),

  /*
    Toggle All
  */
  on(addressBookActions.toggleAllSelection, (state, action) => {
    const updates = utils.toggleAllContacts(Object.values(state.ids), action.isChecked);
    return adapter.updateMany(updates, state);
  }),

  /*
    Toggle Single Item
  */
  on(addressBookActions.toggleItemSelection, (state, action) => {
    const update = utils.toggleContactListItem(action.id, action.isChecked);
    return adapter.updateOne(update, state);
  }),

  /*
    Delete Multiple Rows of Contacts
  */
  on(addressBookActions.deleteMultipleContactsSuccess, (state, action) => {
    const deleteIds = action.contacts.map(c => c.id);
    const updatedInitialList = utils.removeContactsFromInitial(state.initialContactList, deleteIds);
    return adapter.removeMany(deleteIds, {
      ...state,
      initialContactList: updatedInitialList
    });
  }),

  /*
    Sort Columns
  */
  on(addressBookActions.sortContactList, (state, action) => {
    const contactList = utils.changeEntityToArray(state.entities);
    const sortedArray = utils.sortByField(contactList, action.fieldName, action.sortDir);
    return adapter.setAll(sortedArray, state);
  }),

  /*
    Reset Updated List
  */
  on(addressBookActions.resetUpdatedList, (state, action) => {
    return {
      ...state,
      initialUpdatedContactList,
      updateSuccess: null,
    };
  }),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export function sortByName(a: IContact, b: IContact): number {
  return a.name.localeCompare(b.name);
}
