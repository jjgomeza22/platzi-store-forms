import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

import { CategoriesService } from '../../../../core/services/categories.service';
import { finalize } from 'rxjs/operators';
import { MyValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit{

  public form: FormGroup;
  public categoryId: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
    this.route.params
    .subscribe((params: Params) => {
      this.categoryId = params.id;
      if (this.categoryId) {
        this.getCategory();
      }
    });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required, Validators.minLength(4), MyValidators.validateCategory(this.categoriesService)],
      image: ['', Validators.required]
    });
  }

  public save(): void {
    if (this.form.valid) {
      if (this.categoryId) {
        this.updateCategory();
      } else {
        this.createCategory();
      }
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

  private getCategory() {
    this.categoriesService.getCategory(this.categoryId)
    .subscribe((data) => {
      this.form.patchValue(data);
    });
  }

  private updateCategory() {
    const data = this.form.value;
    this.categoriesService.updateCategory(this.categoryId, data)
    .subscribe(() => {
      this.router.navigate(['/admin/categories']);
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
