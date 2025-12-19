import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordValidator {
  static strong(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;

    if (!value) {
      return { required: true };
    }

    if (value.length < 8) {
      return { minLength: true };
    }

    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    if (!pattern.test(value)) {
      return { passwordStrength: true };
    }

    return null;
  }
}
