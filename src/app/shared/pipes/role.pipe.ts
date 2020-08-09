import { Pipe, PipeTransform } from "@angular/core";
import { TitleCasePipe } from "@angular/common";

@Pipe({ name: "roleTitle" })
export class RoleTitlePipe implements PipeTransform {
  constructor(private readonly titleCasePipe: TitleCasePipe) {}

  transform(value: string): string {
    if (value) {
      return this.titleCasePipe.transform(value.replace("_", " "));
    }
  }
}
