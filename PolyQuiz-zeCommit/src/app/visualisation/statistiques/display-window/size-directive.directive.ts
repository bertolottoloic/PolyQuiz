import { Directive, OnInit, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appSizeDirective]'
})
export class SizeDirectiveDirective implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.height = (window.innerHeight - 100) + 'px';
  }

  @HostListener('window:resize')onWindowResize() {
    this.elementRef.nativeElement.style.height = (window.innerHeight - 100) + 'px';
  }

}
