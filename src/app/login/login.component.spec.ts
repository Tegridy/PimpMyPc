import { ToastrModule, ToastrService } from 'ngx-toastr';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: DebugElement;
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ToastrService],
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        CommonModule,
        ToastrModule.forRoot(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    service = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the form controls', () => {
    const formElement = el.nativeElement.querySelector('#login-form');
    const inputElements = formElement.querySelectorAll('input');

    expect(inputElements.length).toBe(3);
  });

  it('should display the form control username require error', () => {
    component.loginForm.controls.username.markAsTouched();

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe('Please enter your username.');
  });

  it('should display the form control password require error', () => {
    component.loginForm.controls.password.markAsTouched();

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe('Please enter your password.');
  });

  it('should send login request', () => {
    const authServiceSpy = spyOn(service, 'loginUser').and.callThrough();
    const componentSpy = spyOn(component, 'loginUser').and.callThrough();

    expect(authServiceSpy).not.toHaveBeenCalled();
    expect(componentSpy).not.toHaveBeenCalled();

    component.loginForm.setValue({
      username: 'John',
      password: 'qwerty',
    });

    component.loginUser();

    expect(authServiceSpy).toHaveBeenCalled();
    expect(componentSpy).toHaveBeenCalled();
  });
});
