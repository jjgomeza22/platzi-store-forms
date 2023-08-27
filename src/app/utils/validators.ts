import { AbstractControl } from '@angular/forms';

export class MyValidators {

  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    console.log(value);
    if (value > 10000) {
      return {price_invalid: true};
    }
    return null;
  }

  static validatePassword(control: AbstractControl) {
    const value = control.value;
    if (!isValid(value)) {
      return {invalid_password: true}
    }
    return null;
  }
}

function isValid (value: string): boolean {
  return value.split('').some(isNumber);
}

function isNumber(value: string) {
  return !isNaN(parseInt(value, 10));
}
