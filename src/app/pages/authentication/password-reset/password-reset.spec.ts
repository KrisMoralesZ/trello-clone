import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordReset } from './password-reset';
import { AuthService } from '@services/auth/auth-service';
import { ReactiveFormsModule } from '@angular/forms';
import { Button } from '@components/button/button';
import { of, throwError } from 'rxjs';

describe('PasswordReset', () => {
  let component: PasswordReset;
  let fixture: ComponentFixture<PasswordReset>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['recovery']);

    await TestBed.configureTestingModule({
      imports: [PasswordReset, ReactiveFormsModule, Button],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordReset);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
    expect(component.form.contains('email')).toBeTrue();
  });

  it('should mark email as required', () => {
    const emailControl = component.form.controls['email'];
    emailControl.setValue('');
    expect(emailControl.hasError('required')).toBeTrue();
  });

  it('should mark email as invalid if not a valid email', () => {
    const emailControl = component.form.controls['email'];
    emailControl.setValue('invalid-email');
    expect(emailControl.hasError('email')).toBeTrue();
  });

  it('should call authService.recovery when form is valid', () => {
    const email = 'test@example.com';
    authServiceSpy.recovery.and.returnValue(of(true));

    component.form.controls['email'].setValue(email);
    component.sendLink();

    expect(authServiceSpy.recovery).toHaveBeenCalledWith(email);
    expect(component.status).toBe('success');
    expect(component.emailSent).toBeTrue();
  });

  it('should set status to failed when recovery fails', () => {
    const email = 'test@example.com';
    authServiceSpy.recovery.and.returnValue(
      throwError(() => new Error('fail'))
    );

    component.form.controls['email'].setValue(email);
    component.sendLink();

    expect(component.status).toBe('failed');
    expect(component.emailSent).toBeFalse();
  });

  it('should not call recovery if form is invalid', () => {
    component.form.controls['email'].setValue('');
    component.sendLink();
    expect(authServiceSpy.recovery).not.toHaveBeenCalled();
  });
});
