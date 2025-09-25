import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { of } from 'rxjs';
import { AuthService } from '@services/auth/auth-service';
import { tokenInterceptor } from './token-interceptor';

describe('tokenInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => tokenInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, HttpClient],
    });
    localStorage.clear();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add the Authorization header', () => {
    const mockHeaders = jasmine.createSpyObj('HttpHeaders', ['set']);
    const mockRequest = jasmine.createSpyObj('HttpRequest', [], {
      headers: mockHeaders,
      url: 'http://test',
      body: null,
      context: {},
      reportProgress: false,
      withCredentials: false,
      responseType: 'json',
      method: 'GET',
      params: {},
      clone: (update: any) => mockRequest,
    });
    const mockNext = jasmine.createSpy('next').and.returnValue(of({}));

    interceptor(mockRequest, mockNext);

    expect(mockNext).toHaveBeenCalledWith(mockRequest);
  });
});
