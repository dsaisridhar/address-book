import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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

  onChange: any = () => {};
  onTouched: any = () => {};

  get value() {
    return this._value;
  }

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  writeValue(value) {
    this.value = value;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  changeCheckBox(ev) {
    this.writeValue(ev.target.checked);
  }
}

