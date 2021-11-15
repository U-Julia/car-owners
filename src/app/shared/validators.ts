import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function stateNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = new RegExp('^[A-Z]{2,2}[0-9]{4,4}[A-Z]{2,2}$').test(control.value);
    return isValid ? null : {stateNumber: true};
  };
}
