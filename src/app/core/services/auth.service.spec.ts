import { Address } from './../../shared/model/User';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import set = Reflect.set;
import {
  HttpErrorResponse,
  HttpHeaderResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { User } from 'src/app/shared/model/User';
import { TestBed } from '@angular/core/testing';

const mockUser: User = {
  username: 'Tester',
  password: 'password',
  email: 'test@test.com',
  firstName: 'John',
  lastName: 'Doe',
  phone: '12345678',
  address: new Address('street1', 'city1', 'state1', '11-111'),
};

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should attempt login', () => {
    spyOn(service, 'loginUser').and.callThrough();
    service.loginUser('test', 'test');
    expect(service.loginUser).toHaveBeenCalled();
  });

  it('should attempt signup', () => {
    spyOn(service, 'signUpUser').and.callThrough();
    service.signUpUser(mockUser);
    expect(service.signUpUser).toHaveBeenCalled();
  });

  it('should send POST to signup', () => {
    service.signUpUser(mockUser).subscribe((user) => {
      expect(user.username).toEqual('Tester');
    });

    const request = httpMock.expectOne(
      'http://localhost:8080/api/v1/auth/register'
    );
    expect(request.request.method).toEqual('POST');
  });

  it('should create user account', () => {
    service.signUpUser(mockUser).subscribe((user) => {
      expect(user.username).toEqual('Tester');
    });

    const request = httpMock.expectOne(
      'http://localhost:8080/api/v1/auth/register'
    );

    expect(request.request.responseType).toEqual('json');
    expect(request.request.body.username).toEqual('Tester');
  });

  it('should throw error after bad register attempt', () => {});

  it('should send POST to login', () => {
    service.loginUser('Tester', 'test').subscribe();

    const request = httpMock.expectOne(
      'http://localhost:8080/api/v1/auth/login'
    );
    request.flush({ username: 'Tester', userId: 1, token: 'JWT-token' });

    expect(request.request.method).toEqual('POST');
  });

  it('should login user', () => {
    service.loginUser('Tester', 'test').subscribe((user) => {
      expect(sessionStorage.getItem('username')).toEqual('Tester');
      expect(sessionStorage.getItem('userId')).toEqual('1');
      expect(sessionStorage.getItem('token')).toEqual('JWT-token');

      service.isUserLoggedIn.subscribe((isLoggedIn) =>
        expect(isLoggedIn).toBeTrue()
      );
    });

    const request = httpMock.expectOne(
      'http://localhost:8080/api/v1/auth/login'
    );
    request.flush({ username: 'Tester', userId: 1, token: 'JWT-token' });

    expect(request.request.responseType).toEqual('json');
    expect(request.request.body.username).toEqual('Tester');
  });

  it('should throw error after bad login attempt', () => {
    service.signUpUser(mockUser).subscribe(
      () => fail('should not success'),
      (error) => {
        expect(error).toBeTruthy();
        expect(error).toContain('code: 500');
        expect(error).toContain('Server error occurred');
      },
      () => fail('should not finalize')
    );

    const error = new ErrorEvent('Server error', {
      message: 'Server error occurred',
    });

    const request = httpMock
      .expectOne('http://localhost:8080/api/v1/auth/register')
      .error(error, { status: 500 });
  });

  it('should show user alert on login error', () => {
    service.loginUser('test', 'test').subscribe(
      () => fail('should not success'),
      (error) => {
        expect(error).toBeTruthy();
        expect(error).toContain('code: 500');
        expect(error).toContain('Server error occurred');
      },
      () => fail('should not finalize')
    );

    const error = new ErrorEvent('Server error', {
      message: 'Server error occurred',
    });

    const request = httpMock
      .expectOne('http://localhost:8080/api/v1/auth/login')
      .error(error, { status: 500 });
  });

  it('should logout user', () => {
    service.loginUser('test', 'test').subscribe(() => {
      expect(sessionStorage.getItem('username')).toEqual('Tester');
      expect(sessionStorage.getItem('userId')).toEqual('1');
      expect(sessionStorage.getItem('token')).toEqual('JWT-token');
    });

    const request = httpMock.expectOne(
      'http://localhost:8080/api/v1/auth/login'
    );
    request.flush({ username: 'Tester', userId: 1, token: 'JWT-token' });

    service.logoutUser();
    service.isUserLoggedIn.subscribe((isLoggedIn) =>
      expect(isLoggedIn).toBeFalse()
    );
  });
});
