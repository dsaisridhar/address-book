import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { IContact, SortDir, UpdateContactList } from 'src/app/address-book/_models';

/*
  Get Initial List of Contacts
*/
export const getContactList = createAction(
  '[Address Book Comp] Get List of Contacts'
);

export const getContactListSuccess = createAction(
  '[Address Book Effect] Get List of Contacts - Success',
  props<{ contactList: IContact[] }>()
);

/*
  Add Contact Row
*/
export const addToContactList = createAction(
  '[Address Book Comp] Add to list of Contacts',
  props<{ contact: IContact }>()
);

/*
  Update Contact Rows
*/
export const updateContactItem = createAction(
  '[Address Book Comp] Update contact item',
  props<{ update: Update<IContact> }>()
);

export const updateAllContactList = createAction(
  '[Address Book Comp] Update Contact List',
  props<{ contacts: IContact[] }>()
);

export const updateAllContactListSuccess = createAction(
  '[Address Book Effect] Update Contact List - Success',
  props<{ updatedContacts: UpdateContactList }>()
);

/*
  Toggle All
*/
export const toggleAllSelection = createAction(
  '[Address Book Comp] Toggle all contact items',
  props<{ isChecked: boolean }>()
);

/*
  Toggle Single Item
*/
export const toggleItemSelection = createAction(
  '[Address Book Comp] Toggle item selection',
  props<{ id: string, isChecked: boolean }>()
);

/*
  Delete Multiple Rows of Contacts
*/
export const deleteMultipleContacts = createAction(
  '[Address Book Comp] Delete Multiple Contacts',
  props<{ contacts: IContact[] }>()
);

export const deleteMultipleContactsSuccess = createAction(
  '[Address Book Effect] Delete Multiple Contacts - Success',
  props<{ contacts: IContact[] }>()
);

/*
  Sort Columns
*/
export const sortContactList = createAction(
  '[Address Book Comp] Sort contact List',
  props<{ fieldName: string, sortDir: SortDir }>()
);

/*
  Reset Updated List
*/
export const resetUpdatedList = createAction(
  '[Address Book Comp] Reset Updated List'
);
