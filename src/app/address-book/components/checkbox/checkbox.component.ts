import { Component, Input, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
// import { Subject } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input('value') _value = false;
  @Input('id') cbxId = 'cbx';

  // checkBoxField = new FormControl(true);
  // destroy$: Subject<boolean> = new Subject<boolean>();

  onChange: any = () => {};
  onTouched: any = () => {};

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  constructor() {
    // this.subscribeChanges();
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  // ngOnDestroy() {
  //   this.destroy$.next(true);
  //   this.destroy$.complete();
  // }

  writeValue(value) {
    if (value) {
      this.value = value;
    }
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  changeCheckBox(ev) {
    this.writeValue(ev.target.checked);
  }

  // private subscribeChanges() {
  //   this.checkBoxField.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
  //     this.writeValue(value);
  //   });
  // }
}

