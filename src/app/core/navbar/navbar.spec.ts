import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../services/auth.service';
import {
  Toast,
  TOAST_CONFIG,
  ToastInjector,
  ToastrComponentlessModule,
  ToastrModule,
  ToastrService,
} from 'ngx-toastr';
import { Event, Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { SharedModule } from '../../shared/shared.module';
import { ProductCategory } from '../../shared/model/ProductCategory';
import { SearchComponent } from '../../search/search.component';
import { ProductsCategoryComponent } from '../../products/products-category/products-category.component';
import { BuildPcComponent } from '../../build-pc/build-pc.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let el: DebugElement;
  let service: AuthService;
  let mockRouter: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ToastrService],
      declarations: [NavbarComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'search', component: SearchComponent },
          { path: 'categories/laptops', component: ProductsCategoryComponent },
          { path: 'build-pc', component: BuildPcComponent },
        ]),
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        SharedModule,
        ToastrModule.forRoot(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    service = TestBed.inject(AuthService);
    mockRouter = TestBed.inject(Router);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout user', () => {
    const componentSpy = spyOn(component, 'logout').and.callThrough();
    const serviceSpy = spyOn(service, 'logoutUser').and.callThrough();

    fixture.detectChanges();

    component.logout();

    expect(componentSpy).toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalledTimes(1);
  });

  it('should toggle menu', () => {
    expect(component.showMenu).toBeFalse();

    const menuItemWithoutSubmenu: ProductCategory[] = [
      {
        id: 1,
        title: 'laptops',
        subCategories: [],
      },
    ];

    component.navigateInMenu(menuItemWithoutSubmenu[0]);

    expect(component.showMenu).toBeTrue();
  });

  it('should toggle menu backdrop', () => {
    expect(component.toggleBackdrop).toBeTrue();

    component.toggleMenuBackdrop();

    expect(component.toggleBackdrop).toBeFalse();
  });

  it('should perform product search', () => {
    component.searchPhrase = 'dell';

    const spy = spyOn(mockRouter, 'navigate');

    component.searchProduct();

    const queryParams = { page: 1, query: 'dell' };

    expect(spy).toHaveBeenCalledWith(['/search'], { queryParams });
  });

  it('should perform product search with given category', () => {
    const categorySelect = el.nativeElement.querySelector('#search-bar-select');
    categorySelect.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    component.searchPhrase = 'dell';

    const spy = spyOn(mockRouter, 'navigate');

    component.searchProduct();

    const queryParams = { query: 'dell', category: 'Everywhere', page: 1 };

    expect(spy).toHaveBeenCalledWith(['/search'], { queryParams });
  });
});
