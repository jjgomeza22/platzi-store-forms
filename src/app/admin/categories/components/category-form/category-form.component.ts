import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

import { CategoriesService } from '../../../../core/services/categories.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent {

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
    private storage: AngularFireStorage,
  ) {
    this.buildForm();
   }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  public save(): void {
    if (this.form.valid) {
      this.createCategory();
    } else {
      this.form.markAllAsTouched();
    }
  }

  private createCategory() {
    const data = this.form.value;
    this.categoriesService.createCategory(data)
    .subscribe(() => {
      this.router.navigate(['./admin/categories']);
    });
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
