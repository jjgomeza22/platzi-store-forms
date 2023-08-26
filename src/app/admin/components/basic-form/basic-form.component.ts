import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  public form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    email: new FormControl(''),
    phone: new FormControl(''),
    color: new FormControl('#780d0d '),
    date: new FormControl(''),
    age: new FormControl(12),
    category: new FormControl('category-2'),
    tag: new FormControl(''),
    agree: new FormControl(false),
    gender: new FormControl(''),
    zone: new FormControl(''),
  });

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
    console.log(this.name.value);
  }

  get name(){
    return this.form.get('name');
  }

  get email(){
    return this.form.get('email');
  }

  get phone(){
    return this.form.get('phone');
  }

  get color(){
    return this.form.get('color');
  }

  get date(){
    return this.form.get('date');
  }

  get age(){
    return this.form.get('age');
  }

  get category(){
    return this.form.get('category');
  }

  get tag(){
    return this.form.get('tag');
  }

  get agree(){
    return this.form.get('agree');
  }

  get gender(){
    return this.form.get('gender');
  }

  get zone(){
    return this.form.get('zone');
  }

  get isNameFieldValid() {
    return this.name.touched && this.name.valid;
  }

  get isNameFieldInValid() {
    return this.name.touched && this.name.invalid;
  }

  save(){
    console.log(this.form.value);
  }

}
