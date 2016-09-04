import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
    selector: '[amScrollLoader]',
    host: {
      '(scroll)': 'onScroll()'
    }
})
export default class ScrollLoaderDirective {
  @Input('amScrollLoader') loadCallback: () => void;
  constructor(private _element: ElementRef) {}
  onScroll() {
    const raw = this._element.nativeElement;
    if (raw.scrollTop + (raw.offsetHeight * 2) >= raw.scrollHeight) {
      this.loadCallback();
    }
  }
}
