import { Directive, forwardRef } from "@angular/core";
import {
  NG_ASYNC_VALIDATORS,
  AsyncValidator,
  AbstractControl,
  ValidationErrors,
} from "@angular/forms";
import { Observable, of } from "rxjs";
import { UsersService } from "src/app/dashboard/pages/users/users.service";
import { map } from "rxjs/operators";

@Directive({
  selector: "[validPhone][formControlName]",
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => PhoneValidationDirective),
      multi: true,
    },
  ],
})
export class PhoneValidationDirective implements AsyncValidator {
  constructor(private readonly usersService: UsersService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.usersService.getUserByPhone(`+2${control.value}`).pipe(
      map((user) => {
        if (user) {
          control.setErrors({ isExists: true });
        } else {
          return of(null);
        }
      })
    );
  }
}
