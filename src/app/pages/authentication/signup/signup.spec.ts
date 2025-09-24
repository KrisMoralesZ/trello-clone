import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

import { Signup } from './signup';
import { AuthService } from '@services/auth/auth-service';
import { Button } from '@components/button/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

class MockAuthService {
  isAvailable = jasmine.createSpy().and.returnValue(of({ isAvailable: true }));
  signUpAndLogin = jasmine.createSpy().and.returnValue(of({}));
  setToken = jasmine.createSpy();
}

class MockRouter {
  navigate = jasmine.createSpy();
}

describe('Signup', () => {
  let component: Signup;
  let fixture: ComponentFixture<Signup>;
  let authService: MockAuthService;
  let router: MockRouter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Signup, ReactiveFormsModule, Button, FontAwesomeModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Signup);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as unknown as MockAuthService;
    router = TestBed.inject(Router) as unknown as MockRouter;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('UI rendering', () => {
    it('should render email input for validateUser step', () => {
      const emailInput = fixture.debugElement.query(
        By.css('input[type="email"]')
      );
      expect(emailInput).toBeTruthy();
    });

    it('should toggle showPassword when clicking eye button', () => {
      component.showRegister = true;
      fixture.detectChanges();

      const btn = fixture.debugElement.query(By.css('button[type="button"]'));
      expect(component.showPassword).toBeFalse();
      btn.nativeElement.click();
      expect(component.showPassword).toBeTrue();
    });
  });

  describe('validateUser', () => {
    it('should set showRegister true if email is available', fakeAsync(() => {
      component.formUser.setValue({ email: 'test@mail.com' });
      component.validateUser();
      tick();
      expect(authService.isAvailable).toHaveBeenCalledWith('test@mail.com');
      expect(component.showRegister).toBeTrue();
    }));

    it('should redirect to login if email is not available', fakeAsync(() => {
      authService.isAvailable.and.returnValue(of({ isAvailable: false }));
      component.formUser.setValue({ email: 'used@mail.com' });
      component.validateUser();
      tick();
      expect(router.navigate).toHaveBeenCalledWith(['/login'], {
        queryParams: { email: 'used@mail.com' },
      });
    }));

    it('should mark formUser as touched if invalid', () => {
      component.formUser.setValue({ email: '' });
      component.validateUser();
      expect(component.formUser.touched).toBeTrue();
    });
  });

  describe('signUpUser', () => {
    beforeEach(() => {
      component.showRegister = true;
      fixture.detectChanges();
    });

    it('should call authService.signUpAndLogin on valid form', fakeAsync(() => {
      component.form.setValue({
        name: 'User',
        email: 'user@mail.com',
        password: '12345678',
        confirmPassword: '12345678',
      });
      component.signUpUser();
      tick();
      expect(authService.signUpAndLogin).toHaveBeenCalledWith(
        'User',
        'user@mail.com',
        '12345678'
      );
      expect(router.navigate).toHaveBeenCalledWith(['/app/boards']);
    }));

    it('should mark all controls touched if form is invalid', () => {
      component.form.setValue({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      component.signUpUser();
      expect(component.form.touched).toBeTrue();
    });

    it('should handle error response from signUpAndLogin', fakeAsync(() => {
      authService.signUpAndLogin.and.returnValue(
        throwError(() => new Error('fail'))
      );
      component.form.setValue({
        name: 'User',
        email: 'user@mail.com',
        password: '12345678',
        confirmPassword: '12345678',
      });
      component.signUpUser();
      tick();
      expect(component.status).toBe('failed');
    }));
  });
});
