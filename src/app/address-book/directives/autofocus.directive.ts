import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterContentInit {

  @Input() public appAutoFocus: boolean;

  constructor(private el: ElementRef) {}

  public ngAfterContentInit() {
    this.el.nativeElement.focus();
  }

}
