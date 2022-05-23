import { UserEdit, UserEditAuth } from './../../shared/model/UserEdit';
import { LoginDetails } from './../../shared/model/LoginDetails';
import { UserService } from './user.service';
import { Address } from './../../shared/model/User';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { User } from 'src/app/shared/model/User';
import { TestBed } from '@angular/core/testing';

describe('UserService', () => {
  let service: UserService;
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(UserService);
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    let store: any = {};
    const mockSessionStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };

    spyOn(sessionStorage, 'getItem').and.callFake(mockSessionStorage.getItem);
    spyOn(sessionStorage, 'setItem').and.callFake(mockSessionStorage.setItem);
    spyOn(sessionStorage, 'removeItem').and.callFake(
      mockSessionStorage.removeItem
    );
    spyOn(sessionStorage, 'clear').and.callFake(mockSessionStorage.clear);

    authService.loginUser('test', 'test').subscribe();

    const req = httpMock.expectOne('http://localhost:8080/api/v1/auth/login');
    expect(req.request.method).toEqual('POST');
    req.flush({
      username: 'test',
      userId: 12,
      token: 'JWT-token',
    } as LoginDetails);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const mockUser: User = {
    username: 'John12',
    password: 'qwerty',
    firstName: 'John',
    lastName: 'Doe',
    address: new Address('street1', 'city1', 'state1', '11-111'),
    phone: '123456789',
    email: 'test@mail.com',
  };

  const error = new ErrorEvent('Server error', {
    message: 'Server error occurred',
  });

  it('should return user account details', () => {
    service.getUserAccountDetails().subscribe((user: User) => {
      expect(sessionStorage.getItem('userId')).toEqual('12');
      expect(user.firstName).toEqual(mockUser.firstName);
      expect(user.address).toEqual(mockUser.address);
    });

    const req2 = httpMock.expectOne('http://localhost:8080/api/v1/user/12');
    expect(req2.request.method).toEqual('GET');
    req2.flush(mockUser);
  });

  it('should handle user account details server error', () => {
    service.getUserAccountDetails().subscribe(
      (user: User) => fail('should not success'),
      (err) => {
        expect(err).toBeTruthy();
        expect(err).toContain('code: 500');
        expect(err).toContain('Server error occurred');
      },
      () => fail('should not complete')
    );

    const req = httpMock
      .expectOne('http://localhost:8080/api/v1/user/12')
      .error(error, { status: 500 });
  });

  const userPersonalData: UserEdit = {
    firstName: 'Ike',
    lastName: 'Doe',
    phone: '987654321',
    email: 'new@mail.com',
  };

  it('should update user personal details', () => {
    service
      .updateUserPersonalDetails(userPersonalData)
      .subscribe((user: UserEdit) => {
        expect(sessionStorage.getItem('userId')).toEqual('12');
        expect(user.firstName).toEqual(userPersonalData.firstName);
        expect(user.lastName).toEqual(userPersonalData.lastName);
        expect(user.email).toEqual(userPersonalData.email);
        expect(user.phone).toEqual(userPersonalData.phone);
      });

    const req2 = httpMock.expectOne(
      'http://localhost:8080/api/v1/user/12/personal'
    );
    expect(req2.request.method).toEqual('PATCH');
    req2.flush(userPersonalData);
  });

  it('should handle user personal details server error', () => {
    service.updateUserPersonalDetails(userPersonalData).subscribe(
      () => fail('should not success'),
      (err) => {
        expect(err).toBeTruthy();
        expect(err).toContain('code: 500');
        expect(err).toContain('Server error occurred');
      },
      () => fail('should not complete')
    );

    const req = httpMock
      .expectOne('http://localhost:8080/api/v1/user/12/personal')
      .error(error, { status: 500 });
  });

  const userAddress: Address = {
    street: 'Ike',
    city: 'Doe',
    state: '987654321',
    zip: 'new@mail.com',
  };

  it('should update user address details', () => {
    service.updateUserAddressDetails(userAddress).subscribe((user: Address) => {
      expect(sessionStorage.getItem('userId')).toEqual('12');
      expect(user.street).toEqual(userAddress.street);
      expect(user.city).toEqual(userAddress.city);
      expect(user.state).toEqual(userAddress.state);
      expect(user.zip).toEqual(userAddress.zip);
    });

    const req2 = httpMock.expectOne(
      'http://localhost:8080/api/v1/user/12/address'
    );
    expect(req2.request.method).toEqual('PATCH');
    req2.flush(userAddress);
  });

  it('should handle user account address details server error', () => {
    service.updateUserAddressDetails(userAddress).subscribe(
      () => fail('should not success'),
      (err) => {
        expect(err).toBeTruthy();
        expect(err).toContain('code: 500');
        expect(err).toContain('Server error occurred');
      },
      () => fail('should not complete')
    );

    const req = httpMock
      .expectOne('http://localhost:8080/api/v1/user/12/address')
      .error(error, { status: 500 });
  });

  const userEditAuth: UserEditAuth = {
    password: 'qwerty2',
  };

  it('should update user password', () => {
    service.updateUserAuthDetails(userEditAuth).subscribe((user: User) => {
      expect(sessionStorage.getItem('userId')).toEqual('12');
      expect(user.username).toEqual(mockUser.username);
      expect(user.password).toEqual(mockUser.password);
    });

    const req2 = httpMock.expectOne(
      'http://localhost:8080/api/v1/user/12/auth'
    );
    expect(req2.request.method).toEqual('PATCH');

    mockUser.password = userEditAuth.password;

    req2.flush(mockUser);
  });

  it('should handle user account password change server error', () => {
    service.updateUserAuthDetails(userEditAuth).subscribe(
      () => fail('should not success'),
      (err) => {
        expect(err).toBeTruthy();
        expect(err).toContain('code: 500');
        expect(err).toContain('Server error occurred');
      },
      () => fail('should not complete')
    );

    const req = httpMock
      .expectOne('http://localhost:8080/api/v1/user/12/auth')
      .error(error, { status: 500 });
  });
});
