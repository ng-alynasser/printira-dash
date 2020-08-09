import { Directive, ElementRef, Input } from "@angular/core";
import { UserTypeEnum, User } from "src/app/common/generated-types";
import { TitleCasePipe } from "@angular/common";

@Directive({
  selector: "[userRole]",
})
export class RoleDirective {
  constructor(private el: ElementRef, private titleCasePipe: TitleCasePipe) {}

  @Input()
  set userRole(value: User) {
    if (value.type === UserTypeEnum.USER) {
      if (value.role && value.role.group) {
        this.el.nativeElement.innerText = this.titleCasePipe.transform(
          value.role.group.replace("_", " ")
        );
      } else {
        this.el.nativeElement.innerText = this.titleCasePipe.transform(
          value.type
        );
      }
    } else if (value.type === UserTypeEnum.DESIGNER) {
      this.el.nativeElement.innerText = this.titleCasePipe.transform(
        value.type.replace("_", " ")
      );
    } else if (value.type === UserTypeEnum.VENDOR) {
      this.el.nativeElement.innerText = this.titleCasePipe.transform(
        value.type.replace("_", " ")
      );
    } else {
      this.el.nativeElement.innerText = this.titleCasePipe.transform(
        value.type
      );
    }
  }
}
