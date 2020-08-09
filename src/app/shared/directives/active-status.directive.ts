import { Directive, ElementRef, Input } from "@angular/core";

@Directive({
  selector: "[activeStatus]",
})
export class ActiveStatusDirective {
  constructor(private el: ElementRef) {}

  @Input()
  set activeStatus(value: boolean) {
    this.el.nativeElement.style.background = "white";
    this.el.nativeElement.style.fontWeight = "400";
    this.el.nativeElement.style.padding = ".3rem .8rem";
    this.el.nativeElement.innerHTML = "Active";
    this.el.nativeElement.style.borderRadius = "5px";
    if (value) {
      this.el.nativeElement.style.border = "1px solid #2ce69b";
      this.el.nativeElement.color = "#2ce69b";
    } else {
      this.el.nativeElement.style.border = "1px solid #fa4252";
      this.el.nativeElement.color = "#fa4252";
    }
  }
}
