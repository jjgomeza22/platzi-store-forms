import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  public form = new FormGroup({
    fullName: new FormBuilder().group({
      name: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z]+$/)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z]+$/)]),
    }),
    name: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z]+$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    color: new FormControl('#780d0d '),
    date: new FormControl(''),
    age: new FormControl(12, [Validators.required, Validators.min(18), Validators.max(100)]),
    category: new FormControl('category-2'),
    tag: new FormControl(''),
    agree: new FormControl(false, [Validators.requiredTrue]),
    gender: new FormControl(''),
    zone: new FormControl(''),
  });

  public form1: FormGroup;

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

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.nameField.valueChanges
    .subscribe(value => {
      console.log(value);
    });

    this.form1.valueChanges
    .subscribe(value => {
      console.log(value);
    });
  }

  public getNameFliedValue(): void {
    console.log(this.name.value);
  }

  get name(){
    return this.form1.get('fullName').get('name');
  }

  get lastName() {
    return this.form1.get('fullName.lastName'); //Evitamos dos get
  }

  get email(){
    return this.form1.get('email');
  }

  get phone(){
    return this.form1.get('phone');
  }

  get color(){
    return this.form1.get('color');
  }

  get date(){
    return this.form1.get('date');
  }

  get age(){
    return this.form1.get('age');
  }

  get category(){
    return this.form1.get('category');
  }

  get tag(){
    return this.form1.get('tag');
  }

  get agree(){
    return this.form1.get('agree');
  }

  get gender(){
    return this.form1.get('gender');
  }

  get zone(){
    return this.form1.get('zone');
  }

  get isNameFieldValid() {
    return this.name.touched && this.name.valid;
  }

  get isNameFieldInValid() {
    return this.name.touched && this.name.invalid;
  }

  save() {
    if (this.form1.valid) {
      console.log(this.form1.value);
    } else {
      this.form1.markAllAsTouched();
    }
  }

  private buildForm() {
    this.form1 = this.formBuilder.group({
      fullName: this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z]+$/)]],
        lastName: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z]+$/)]],
      }),
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      color: ['#780d0d '],
      date: [''],
      age: [12, [Validators.required, Validators.min(18), Validators.max(100)]],
      category: ['category-2'],
      tag: [''],
      agree: [false, [Validators.requiredTrue]],
      gender: [''],
      zone: [''],
    });
  }
}
