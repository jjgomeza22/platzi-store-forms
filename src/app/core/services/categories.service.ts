import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient,
  ) { }

  public getAllCategories() {
    return this.http.get<Category[]>(`${environment.url_api}/categories/`);
  }

  public getCategory(id: string) {
    return this.http.get<Category>(`${environment.url_api}/categories/${id}`);
  }

  public createCategory(data: Partial<Category>) {
    return this.http.post<Category[]>(`${environment.url_api}/categories/`, data);
  }

  public updateCategory(id: string, data: Partial<Category>) {
    return this.http.put<Category[]>(`${environment.url_api}/categories/${id}`, data);
  }

  public checkCategory(name: string) {
    return this.http.post(`${environment.url_api}/categories/availability`, name);
  }
}
