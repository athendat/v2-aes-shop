import { Directive, Output, EventEmitter, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
    selector: '[clickOutside]',
    standalone: true
})
export class ClickOutsideDirective {
  private elementRef = inject(ElementRef);

  @Output() clickOutside = new EventEmitter<Event>();
  
  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
        this.clickOutside.emit(event);
    }
  }
  
}