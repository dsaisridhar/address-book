import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {

  @Input() public appNumbersOnly: boolean;

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    if (this.appNumbersOnly) {
      const initalValue = this._el.nativeElement.value;
      this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
      if ( initalValue !== this._el.nativeElement.value) {
        event.stopPropagation();
      }
    }
  }
}
