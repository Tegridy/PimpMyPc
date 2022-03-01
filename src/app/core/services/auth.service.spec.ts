import { mockUser } from './auth.service.spec';
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
import { Observable, throwError } from 'rxjs';
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
    service.signUpUser(mockUser).subscribe();

    const req = httpMock.expectOne('http://localhost:8080/api/auth/register');
    expect(req.request.method).toEqual('POST');
  });

  it('should create user account', () => {
    service.signUpUser(mockUser).subscribe();

    const req = httpMock.expectOne('http://localhost:8080/api/auth/register');
    req.flush({ username: 'test' });

    expect(req.request.responseType).toEqual('json');
    expect(req.request.body.username).toEqual('test');
  });

  it('should send POST to login', () => {
    service.loginUser('test', 'test');

    const req = httpMock.expectOne('http://localhost:8080/api/auth/login');
    expect(req.request.method).toEqual('POST');
  });

  it('should login user', () => {
    service.loginUser('test', 'test');

    const req = httpMock.expectOne('http://localhost:8080/api/auth/login');
    req.flush({ username: 'test', userId: 1, token: 'JWT-token' });

    expect(req.request.responseType).toEqual('json');
    expect(req.request.body.username).toEqual('test');
    expect(req.request.body.userId).toEqual(1);
    expect(req.request.body.token).toEqual('JWT-token');
  });

  //   it('should show user alert on login error', () => {
  //     spyOn(window, 'alert');

  //     service.login('test', 'test');
  //     httpMock
  //       .expectOne('http://localhost:8080/api/auth/login')
  //       .error(new ErrorEvent('500'));

  //     expect(window.alert).toHaveBeenCalledWith(
  //       'Błąd podczas logowania. Proszę spróbować pózniej.'
  //     );
  //   });

  it('should logout user', () => {
    service.logoutUser();
    service.isUserLoggedIn.subscribe((isLoggedIn) =>
      expect(isLoggedIn).toBeFalse()
    );
  });
});
