import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth-service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const apiUrl = 'https://fake-trello-api.herokuapp.com';
  const mockToken = 'fake-jwt-token';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Token management', () => {
    it('should store token in localStorage', () => {
      service.setToken(mockToken);
      expect(localStorage.getItem('auth_token')).toBe(mockToken);
    });

    it('should retrieve token from localStorage', () => {
      localStorage.setItem('auth_token', mockToken);
      expect(service.getToken()).toBe(mockToken);
    });

    it('should remove token from localStorage', () => {
      localStorage.setItem('auth_token', mockToken);
      service.removeToken();
      expect(localStorage.getItem('auth_token')).toBeNull();
    });

    it('should return true if authenticated', () => {
      localStorage.setItem('auth_token', mockToken);
      expect(service.isAuthenticated()).toBeTrue();
    });

    it('should return false if not authenticated', () => {
      expect(service.isAuthenticated()).toBeFalse();
    });
  });

  describe('Auth API calls', () => {
    it('should login and store token', () => {
      const mockResponse = { access_token: mockToken };

      service.login('test@test.com', '123456').subscribe();
      const req = httpMock.expectOne(`${apiUrl}/api/v1/auth/login`);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);

      expect(localStorage.getItem('auth_token')).toBe(mockToken);
    });

    it('should signup and store token', () => {
      const mockResponse = { access_token: mockToken };

      service.signup('Test User', 'test@test.com', '123456').subscribe();
      const req = httpMock.expectOne(`${apiUrl}/api/v1/auth/register`);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);

      expect(localStorage.getItem('auth_token')).toBe(mockToken);
    });

    it('should check email availability', () => {
      const mockResponse = { isAvailable: true };

      service.isAvailable('test@test.com').subscribe((res) => {
        expect(res.isAvailable).toBeTrue();
      });

      const req = httpMock.expectOne(`${apiUrl}/api/v1/auth/is-available`);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });

    it('should send recovery email', () => {
      const mockResponse = { message: 'Recovery email sent' };

      service.recovery('test@test.com').subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}/api/v1/auth/recovery`);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });

    it('should change password', () => {
      const mockResponse = { message: 'Password changed' };

      service.changePassword('reset-token', 'newpassword').subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}/api/v1/auth/change-password`);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  });
});
