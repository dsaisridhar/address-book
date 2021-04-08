import { Component, Input, EventEmitter, forwardRef, Output } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InlineEditComponent),
  multi: true
};

@Component({
  selector: 'app-inline-edit',
  templateUrl: './inline-edit.component.html',
  providers: [VALUE_ACCESSOR],
  styleUrls: ['./inline-edit.component.scss']
})

export class InlineEditComponent implements ControlValueAccessor{
  @Input() id = 0;
  @Input() required = true;
  @Input() fieldName = '';

  @Output() blur = new EventEmitter<any>();
  private _value = '';
  private editing = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  get value(): any {
    return this._value;
  }

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  get isPhoneField(): boolean {
    return this.fieldName.includes('Phone');
  }

  get maxlength(): number {
    return this.isPhoneField ? 10 : 50;
  }

  writeValue(value: any) {
    this._value = value;
  }

  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  onBlur($event: Event) {
    this.editing = false;
    this.blur.emit({ fieldName: this.fieldName, value: this.value });
  }

  beginEdit(value) {
    this.editing = true;
  }
}

