import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  public nameField = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  public emailField = new FormControl('');
  public phoneField = new FormControl('');
  public colorField = new FormControl('#780d0d ');
  public dateField = new FormControl('');
  public ageField = new FormControl(12);
  public categoryField = new FormControl('category-2');
  public tagField = new FormControl('');
  public agreeField = new FormControl(false);
  public genderField = new FormControl('');
  public zoneField = new FormControl('');

  ngOnInit(): void {
    this.nameField.valueChanges
    .subscribe(value => {
      console.log(value);
    });
  }

  public getNameFliedValue(): void {
    console.log(this.nameField.value);
  }

  get isNameFieldValid() {
    return this.nameField.touched && this.nameField.valid;
  }

  get isNameFieldInValid() {
    return this.nameField.touched && this.nameField.invalid;
  }

}
