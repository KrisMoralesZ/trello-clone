import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth-service';

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
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  describe('Token Management', () => {
    it('should set, get, and remove token correctly', () => {
      const token = 'test-token';
      service.setToken(token);
      expect(service.getToken()).toBe(token);
      service.removeToken();
      expect(service.getToken()).toBeNull();
    });

    it('should return authentication status correctly', () => {
      expect(service.isAuthenticated()).toBeFalse();
      service.setToken('test-token');
      expect(service.isAuthenticated()).toBeTrue();
      service.removeToken();
      expect(service.isAuthenticated()).toBeFalse();
    });
  });

  describe('Login', () => {
    it('should login and store token on success', () => {
      const mockResponse = { access_token: 'fake-jwt-token' };
      service.login('', 'password').subscribe((response) => {
        expect(response).toEqual(mockResponse);
        expect(service.getToken()).toBe(mockResponse.access_token);
      });

      const req = httpMock.expectOne(
        'https://fake-trello-api.herokuapp.com/api/v1/auth/login'
      );
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  });
});
