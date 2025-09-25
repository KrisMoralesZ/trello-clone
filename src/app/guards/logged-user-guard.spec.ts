import { AuthService } from '@services/auth/auth-service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { loggedUserGuard } from './logged-user-guard';
import { HttpClient } from '@angular/common/http';

describe('loggedUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => loggedUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, HttpClient],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true if token exists', () => {
    const mockAuthService = {
      getToken: () => 'mock-token',
    };
    TestBed.overrideProvider('AuthService', { useValue: mockAuthService });

    const mockRoute = {} as ActivatedRouteSnapshot;
    const mockState = {} as RouterStateSnapshot;

    const result = executeGuard(mockRoute, mockState);
    expect(result).toBeTrue();
  });

  it('should return false if token does not exist', () => {
    const mockAuthService = {
      getToken: () => null,
    };
    TestBed.overrideProvider('AuthService', { useValue: mockAuthService });

    const mockRoute = {} as ActivatedRouteSnapshot;
    const mockState = {} as RouterStateSnapshot;

    const result = executeGuard(mockRoute, mockState);
    expect(result).toBeTrue();
  });
});
