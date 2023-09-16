import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

import { CategoriesService } from 'src/app/core/services/categories.service';
import { MyValidators } from 'src/app/utils/validators';
import { Category } from 'src/app/core/models/category.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent {

  public form: FormGroup;
  public isNew: boolean = true;

  @Input()
  set category(data: Category) {
    if (data) {
      this.isNew = false;
      this.form.patchValue(data);
    }
  }

  @Output() create =  new EventEmitter();
  @Output() update =  new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private storage: AngularFireStorage,
  ) {
    this.buildForm();
   }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required, Validators.minLength(4), MyValidators.validateCategory(this.categoriesService)],
      image: ['', Validators.required]
    });
  }

  public save(): void {
    if (this.form.valid) {
      if (this.isNew) {
        this.create.emit(this.form.value);
      } else {
        this.update.emit(this.form.value);
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  public uploadFile(event) {
    const image = event.target.files[0];
    const name = 'category.png';
    const ref = this.storage.ref(name);
    const task = this.storage.upload(name, image);

    task.snapshotChanges()
    .pipe(
      finalize(() => {
        const urlImage$ = ref.getDownloadURL();
        urlImage$.subscribe(url => {
          console.log(url);
          this.image.setValue(url);
        })
      })
    )
    .subscribe();
  }

  get name() {
    return this.form.get('name');
  }

  get image() {
    return this.form.get('image');
  }
}
