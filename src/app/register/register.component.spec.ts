import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RegisterComponent } from './register.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth.service';
import { Address } from '../shared/model/User';
import { add } from 'ionicons/icons';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let el: DebugElement;
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ToastrService],
      declarations: [RegisterComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        CommonModule,
        ToastrModule.forRoot(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    service = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the form controls', () => {
    const formElement = el.nativeElement.querySelector('#register-form');
    const inputElements = formElement.querySelectorAll('input');

    expect(inputElements.length).toBe(12);
  });

  it('should display the form control username length error', () => {
    const formElement = el.nativeElement.querySelector('#register-form');

    component.registerForm.controls.username.setValue('a');

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe(
      'The username must be longer than 3 characters.'
    );
  });

  it('should display the form control username require error', () => {
    const formElement = el.nativeElement.querySelector('#register-form');

    component.registerForm.controls.username.markAsTouched();

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe('Please enter your username.');
  });

  it('should display the form control firstname length error', () => {
    const formElement = el.nativeElement.querySelector('#register-form');

    component.registerForm.controls.firstName.setValue('a');

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe(
      'The first name must be longer than 3 characters.'
    );
  });

  it('should display the form control firstname require error', () => {
    const formElement = el.nativeElement.querySelector('#register-form');

    component.registerForm.controls.firstName.markAsTouched();

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe('Please enter your first name.');
  });

  it('should display the form control lastname length error', () => {
    const formElement = el.nativeElement.querySelector('#register-form');

    component.registerForm.controls.lastName.setValue('a');

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe(
      'The last name must be longer than 3 characters.'
    );
  });

  it('should display the form control email require error', () => {
    component.registerForm.controls.email.markAsTouched();

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe('E-mail address is required.');
  });

  it('should display the form control email validation error', () => {
    component.registerForm.controls.email.setValue('notvalidmail');

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe('E-mail address is not valid.');
  });

  it('should display the form control phone require error', () => {
    component.registerForm.controls.phone.markAsTouched();

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe('Phone number is required.');
  });

  it('should display the form control phone validation error', () => {
    component.registerForm.controls.phone.setValue('not a phone number');

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe('Phone number is not valid.');
  });

  it('should display the form control lastname require error', () => {
    component.registerForm.controls.lastName.markAsTouched();

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe('Please enter your last name.');
  });

  it('should display the form control state length error', () => {
    component.registerForm.controls.address.get('state')?.setValue('a');

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe(
      'The state name must be longer than 3 characters.'
    );
  });

  it('should display the form control state require error', () => {
    component.registerForm.controls.address.get('state')?.markAsTouched();

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe('Please enter your state name.');
  });

  it('should display the form control city length error', () => {
    component.registerForm.controls.address.get('city')?.setValue('a');

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe(
      'The city name must be longer than 3 characters.'
    );
  });

  it('should display the form control city require error', () => {
    component.registerForm.controls.address.get('city')?.markAsTouched();

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe('Please enter your city name.');
  });

  it('should display the form control street length error', () => {
    component.registerForm.controls.address.get('street')?.setValue('a');

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe(
      'The street name must be longer than 3 characters.'
    );
  });

  it('should display the form control street require error', () => {
    component.registerForm.controls.address.get('street')?.markAsTouched();

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe('Please enter your street name.');
  });

  it('should display the form control zip code length error', () => {
    component.registerForm.controls.address.get('zip')?.setValue('1');

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe(
      'The zip code must be longer than 3 characters.'
    );
  });

  it('should display the form control zip code require error', () => {
    component.registerForm.controls.address.get('zip')?.markAsTouched();

    fixture.detectChanges();

    const errorSpan = el.nativeElement.querySelector('.error-message');

    expect(errorSpan).toBeTruthy();
    expect(errorSpan.textContent).toBe('Please enter your zip code.');
  });

  it('should send save request', () => {
    const authServiceSpy = spyOn(service, 'signUpUser').and.callThrough();
    const componentSpy = spyOn(component, 'saveForm').and.callThrough();

    expect(authServiceSpy).not.toHaveBeenCalled();
    expect(componentSpy).not.toHaveBeenCalled();

    const address = new Address('street1', 'city1', 'state1', '11-111');

    component.registerForm.setValue({
      username: 'John',
      password: 'qwerty',
      firstName: 'Mike',
      lastName: 'Doe',
      address,
      email: 'mail@mail.com',
      phone: '1234567',
    });

    component.saveForm();

    expect(authServiceSpy).toHaveBeenCalled();
    expect(componentSpy).toHaveBeenCalled();
  });
});
