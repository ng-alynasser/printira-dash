import {
  ValidationErrors,
  ValidatorFn,
  AbstractControl,
  AsyncValidatorFn,
} from "@angular/forms";
import PhoneNumber from "awesome-phonenumber";

export class CustomValidators {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }

      const valid = regex.test(control.value);

      return valid ? null : error;
    };
  }

  static phoneValidator(control: AbstractControl): ValidationErrors {
    const phone: string = control.get("phone").value;

    const phoneValidation = new PhoneNumber(`+2${phone}`);
    if (phone && (!phoneValidation.isValid() || !phoneValidation.isMobile())) {
      control.get("phone").setErrors({ invalidPhone: true });
    } else {
      return null;
    }
  }

  static passwordMatchValidator(control: AbstractControl): ValidatorFn {
    const password: string = control.get("password").value;
    const confirmPassword: string = control.get("confirmPassword").value;

    if (password && confirmPassword && password !== confirmPassword) {
      control.get("confirmPassword").setErrors({ NoPasswordMatch: true });
      return null;
    }
  }
}
