import { categories } from './../navbar/Categories';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Laptop } from '../../shared/model/Laptop';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProductResponse } from '../../shared/model/ProductResponse';

@Injectable()
export class CategoriesService {
  constructor(private http: HttpClient) {}

  currentCategoryName: string = '';

  public set setCurrentCategoryName(currentCategoryName: string) {
    this.currentCategoryName = currentCategoryName;
  }

  public get getCurrentCategoryName() {
    return this.currentCategoryName;
  }
}
