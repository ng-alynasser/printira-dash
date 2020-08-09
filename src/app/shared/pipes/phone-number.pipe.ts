import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "phoneNumber" })
export class PhoneNumberPipe implements PipeTransform {
  transform(value: string): string {
    if (value.startsWith("+")) {
      return value.slice(2);
    } else {
      return value;
    }
  }
}
