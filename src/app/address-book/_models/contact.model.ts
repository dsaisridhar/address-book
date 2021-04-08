export interface IContact {
  id: string;
  name: string;
  location: string;
  office: string;
  officePhone: string;
  cellPhone: string;
  selected: boolean | null;
  isNew?: boolean;
  uiId?: string;
}

export interface UpdateContactList {
  addedItems: IContact[];
  updatedItems: IContact[];
  newContactList?: IContact[];
  updateSuccess?: boolean | null;
}

export type SortDir = 'asc' | 'desc';
