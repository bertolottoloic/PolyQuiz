import { Directive, Input, HostListener, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appSizeBoxDirective]'
})
export class SizeBoxDirectiveDirective implements OnInit{
  @Input() heightMax: string;
  @Input() heightMin: string;
  @Input() widthMax: number;
  @Input() widthMin: number;

  constructor(private elementRef: ElementRef) {

   }

   ngOnInit() {
    if (this.heightMax && this.heightMin) {
      this.elementRef.nativeElement.style.height = (window.innerWidth > 990) ? this.heightMax : this.heightMin;
    }
   }
  @HostListener('window:resize') onWindowResize() {
    if (this.heightMax && this.heightMin) {
      this.elementRef.nativeElement.style.height = (window.innerWidth > 990) ? this.heightMax : this.heightMin;
    }
  }

}
