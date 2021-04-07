import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { AddressBookComponent } from './address-book.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';

@NgModule({
  declarations: [
    AddressBookComponent,
    CheckboxComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
  ],
  exports: [
    AddressBookComponent,
  ]
})
export class AddressBookModule { }
