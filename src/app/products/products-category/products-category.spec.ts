import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../core/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsCategoryComponent } from './products-category.component';
import { PaginatePipe, PaginationService } from 'ngx-pagination';
import { BaseProduct } from '../../shared/model/BaseProduct';

describe('ProductsCategoryComponent', () => {
  let component: ProductsCategoryComponent;
  let fixture: ComponentFixture<ProductsCategoryComponent>;
  let el: DebugElement;
  let service: ProductsService;
  let routerSpy: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [PaginationService],
      declarations: [ProductsCategoryComponent, PaginatePipe],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsCategoryComponent);
    service = TestBed.inject(ProductsService);
    routerSpy = TestBed.inject(Router);

    component = fixture.componentInstance;
    el = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable modal', () => {
    expect(component.showModal).toBe(false);

    component.toggleModal();

    expect(component.showModal).toBe(true);
  });

  it('should change product view from grid to list', () => {
    expect(component.showProductsInListView).toBe(false);

    component.changeProductsView();

    expect(component.showProductsInListView).toBe(true);
  });

  it('should change product view from grid to list', () => {
    expect(component.showProductsInListView).toBe(false);

    component.changeProductsView();

    expect(component.showProductsInListView).toBe(true);
  });

  it('should change page', () => {
    component.onPageChange(2);

    expect(component.loading).toBe(true);
    const mockUrlTree = routerSpy.parseUrl('/categories/laptops?page=1');
    // @ts-ignore: force this private property value for testing.
    routerSpy.currentUrlTree = mockUrlTree;

    expect(routerSpy.url).toContain('page=1');
  });

  it('should display products', () => {
    const product: BaseProduct = { id: 1, title: 'Laptop', price: 800 };
    const product2: BaseProduct = { id: 2, title: 'Computer', price: 1800 };

    component.products = [product, product2];

    fixture.detectChanges();

    const productsElements = el.nativeElement.querySelectorAll('#product');

    expect(productsElements.length).toBe(2);
  });
});
