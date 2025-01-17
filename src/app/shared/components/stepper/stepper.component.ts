import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StepperComponent),
      multi: true
    }
  ]
})
export class StepperComponent implements ControlValueAccessor {

  currentValue = 0;
  onChange = (_: any) => {};
  onTouch = () => {};
  isDisabled: boolean;

  add() {
    this.currentValue += 1;
    this.onTouch();
    this.onChange(this.currentValue);
  }

  sub() {
    this.currentValue -= 1;
    this.onTouch();
    this.onChange(this.currentValue);
  }

  writeValue(value: number): void {
    if (value) {
      this.currentValue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

    // Aquí realizas la validación personalizada
    validate() {
      if (this.currentValue > 95) {
        return { maxLengthExceeded: true };
      }
      return null;
    }

}
