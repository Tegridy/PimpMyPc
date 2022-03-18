import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Event, Router } from '@angular/router';

import { AccountSettingsComponent } from './account-settings.component';
import { AuthService } from '../../core/services/auth.service';
import { Address, User } from '../../shared/model/User';

describe('AccountSettingsComponent', () => {
  let component: AccountSettingsComponent;
  let fixture: ComponentFixture<AccountSettingsComponent>;
  let el: DebugElement;
  let service: AuthService;
  let mockRouter: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ToastrService],
      declarations: [AccountSettingsComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ToastrModule.forRoot(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountSettingsComponent);
    service = TestBed.inject(AuthService);
    mockRouter = TestBed.inject(Router);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load form data', () => {
    const mockUser: User = {
      username: 'Tester',
      password: 'password',
      email: 'test@test.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '12345678',
      address: new Address('street1', 'city1', 'state1', '11-111'),
    };

    component.loadFormData(mockUser);

    fixture.detectChanges();

    const formInputs = el.nativeElement.querySelectorAll('input');

    formInputs.forEach((input: any) => {
      expect(input.value).toBeTruthy();
      expect(input.value.length).toBeGreaterThan(1);
    });
  });

  it('should open personal data edit form and show validation errors', () => {
    const button = el.nativeElement.querySelector('#personal-data-edit');

    button.click();

    component.personalDetailsForm.markAllAsTouched();

    fixture.detectChanges();

    const errorSpans = el.nativeElement.querySelectorAll('.error-message');

    expect(errorSpans.length).toBe(4);
  });

  it('should open address data edit form and show validation errors', () => {
    const button = el.nativeElement.querySelector('#address-data-edit');

    button.click();

    component.addressDetailsForm.markAllAsTouched();

    fixture.detectChanges();

    const errorSpans = el.nativeElement.querySelectorAll('.error-message');

    expect(errorSpans.length).toBe(4);
  });

  it('should open password edit form and show validation errors', () => {
    const button = el.nativeElement.querySelector('#password-edit');

    button.click();

    component.authDetailsForm.markAllAsTouched();

    fixture.detectChanges();

    const errorSpans = el.nativeElement.querySelectorAll('.error-message');

    expect(errorSpans.length).toBe(2);
  });
});
