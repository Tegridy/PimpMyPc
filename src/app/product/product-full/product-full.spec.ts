import { ToastrModule, ToastrService } from 'ngx-toastr';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFullComponent } from './product-full.component';
import { ProductsService } from '../../core/services/products.service';
import { Router } from '@angular/router';
import {TranslateFakeCompiler, TranslateFakeLoader, TranslateService} from '@ngx-translate/core';

describe('ProductFullComponent', () => {
  let component: ProductFullComponent;
  let fixture: ComponentFixture<ProductFullComponent>;
  let el: DebugElement;
  let service: ProductsService;
  let routerSpy: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ToastrService],
      declarations: [ProductFullComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        CommonModule,
        ToastrModule.forRoot()
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFullComponent);
    service = TestBed.inject(ProductsService);
    routerSpy = TestBed.inject(Router);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    component.product = {
      id: 43,
      brand: 'comp',
      price: 999,
      model: 'model',
      title: 'PC',
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle modal', () => {
    expect(component.showModal).toBe(false);

    component.toggleModal();

    expect(component.showModal).toBe(true);
  });

  it('should show full desc', () => {
    expect(component.showFullDescription).toBe(false);

    component.showFullText();

    expect(component.showFullDescription).toBe(true);
  });
});
