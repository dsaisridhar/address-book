import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromAddressBook from './state/address-book.reducer';
import { AddressBookEffects } from './state/address-book.effects';

import { AutoFocusDirective } from './directives/autofocus.directive';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { PhoneFormatPipe } from './pipes/phone-format.pipe';

import { AddressBookComponent } from './address-book.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { InlineEditComponent } from './components/inline-edit/inline-edit.component';
import { ModalComponent } from './components/modal/modal.component';
import { ContactListItemComponent } from './components/contact-list-item/contact-list-item.component';

@NgModule({
  declarations: [
    AddressBookComponent,
    CheckboxComponent,
    InlineEditComponent,
    AutoFocusDirective,
    NumbersOnlyDirective,
    PhoneFormatPipe,
    ModalComponent,
    ContactListItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    StoreModule.forFeature(fromAddressBook.addressBookFeatureKey, fromAddressBook.reducer),
    EffectsModule.forFeature([AddressBookEffects]),
  ],
  exports: [
    AddressBookComponent,
  ]
})
export class AddressBookModule { }
