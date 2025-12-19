import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class MatchPasswordValidator {
  static match(passwordControlName: string, confirmPasswordControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get(passwordControlName);
      const confirmPassword = formGroup.get(confirmPasswordControlName);

      if (!password || !confirmPassword) {
        return null;
      }

      if (!confirmPassword.value) {
        return null;
      }

      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      }

      if (confirmPassword.hasError('passwordMismatch')) {
        confirmPassword.setErrors(null);
      }

      return null;
    };
  }
}
