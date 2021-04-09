import { updateAllContactList } from './../state/address-book.actions';
import { IContact, SortDir, UpdateContactList } from 'src/app/address-book/_models';
import { Update } from '@ngrx/entity';

const comparableFields = [
  'name', 'location', 'office', 'officePhone', 'cellPhone'
];

export function toggleContactListItem(id: string, isChecked: boolean): Update<IContact> {
  return {
    id,
    changes: {
      selected: isChecked,
    },
  };
}

export function toggleAllContacts(ids: string[], isChecked: boolean): Update<IContact>[] {
  return ids.map((id: string) => {
    return {
      id,
      changes: {
        selected: isChecked
      }
    };
  });
}

export function changeEntityToArray(entities): IContact[] {
  const items: IContact[] = Object.values(entities);

  return items;
}

export function removeContactsFromInitial(initialList: IContact[], deleteIds: string[]) {
  return initialList.filter(c => deleteIds.indexOf(c.id) === -1);
}

export function sortByField(contactList: IContact[], fieldName: string, sortDir?: SortDir) {
  if (sortDir === 'desc') {
    return contactList.slice().sort((a, b) => (a[fieldName] > b[fieldName]) ? 1 : ((b[fieldName] > a[fieldName]) ? -1 : 0)).reverse();
  }
  return contactList.slice().sort((a, b) => (a[fieldName] > b[fieldName]) ? 1 : ((b[fieldName] > a[fieldName]) ? -1 : 0));
}

export function getUpdatedItems(initialContactList: IContact[], currentContactList: IContact[]): UpdateContactList {
  const updatedContactList: UpdateContactList = {
    addedItems: [],
    updatedItems: [],
  };
  const nonNewCurrentList = [];

  updatedContactList.addedItems = currentContactList.filter(c => {
    if (!c.isNew) {
      nonNewCurrentList.push(c);
      return false;
    }

    return true;
  });

  const sortedList1 = sortByField(initialContactList, 'id');
  const sortedList2 = sortByField(nonNewCurrentList, 'id');

  sortedList2.forEach((c: IContact, i) => {
    if (sortedList1[i]) {
      for (const element of comparableFields) {
        if (sortedList1[i][element] !== sortedList2[i][element]) {
          updatedContactList.updatedItems.push(sortedList2[i]);
          return;
        }
      }
    }
  });

  return updatedContactList;
}

export function getNewContactList(currentList: IContact[], listUpdatedToAPI: IContact[]): IContact[] {
  const currentListMap: any = {};
  currentList.forEach((c: IContact) => {
    currentListMap[c.id] = c;
  });

  const newContactList = listUpdatedToAPI.map((updatedContact: IContact) => {
    const id = updatedContact.isNew ? updatedContact.uiId : updatedContact.id;
    currentListMap[id] = updatedContact;
    currentListMap[id].selected = false;
    delete currentListMap[id].isNew;
  });

  return Object.values(currentListMap);
}
