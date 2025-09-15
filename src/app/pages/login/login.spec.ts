import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-button',
  template: '<button><ng-content></ng-content></button>',
})
class MockButtonComponent {}

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login, MockButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render email and password inputs', () => {
    const emailInput = fixture.debugElement.query(
      By.css('input[type="email"]')
    );

    const passwordInput = fixture.debugElement.query(
      By.css('input[type="password"]')
    );

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('should render the submit button', () => {
    const button = fixture.debugElement.query(By.css('app-button'));
    expect(button).toBeTruthy();
    expect(button.nativeElement.textContent).toContain('Log In');
  });

  it('should have forgot password and register links', () => {
    const forgotLink = fixture.debugElement.query(
      By.css('a[href="/forgot-password"]')
    );
    const registerLink = fixture.debugElement.query(
      By.css('a[href="/register"]')
    );

    expect(forgotLink).toBeTruthy();
    expect(registerLink).toBeTruthy();
    expect(forgotLink.nativeElement.textContent).toContain("Can't log in?");
    expect(registerLink.nativeElement.textContent).toContain(
      'Sign up for an account'
    );
  });
});
