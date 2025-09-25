import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Navbar } from './navbar';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '@services/auth/auth-service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

const mockUser = {
  id: '1',
  username: 'Test User',
  email: 'test@example.com',
  avatarUrl: '/assets/images/test-avatar.png',
};

class MockUsersService {
  user$ = of(mockUser);
}

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, Navbar, HttpClientTestingModule],
      providers: [
        {
          provide: AuthService,
          useValue: { removeToken: jasmine.createSpy('removeToken') },
        },
        { provide: 'UsersService', useClass: MockUsersService },
        HttpClient,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render logo with routerLink /app', () => {
    const el: HTMLElement = fixture.nativeElement;
    const logo = el.querySelector('[data-testid="logo"]');
    expect(logo).toBeTruthy();
    expect(
      logo?.getAttribute('ng-reflect-router-link') ||
        logo?.getAttribute('routerLink')
    ).toContain('/app');
  });

  it('should render navigation links', () => {
    const el: HTMLElement = fixture.nativeElement;
    const links = Array.from(el.querySelectorAll('a'))
      .map((a) => a.textContent?.trim())
      .filter(Boolean);
    expect(links).toContain('Users');
  });

  it('should render Create button', () => {
    const el: HTMLElement = fixture.nativeElement;
    const btn = el.querySelector('[data-testid="create-btn"]');
    expect(btn).toBeTruthy();
  });

  it('should render user photo', () => {
    const el: HTMLElement = fixture.nativeElement;
    const img = el.querySelector(
      '[data-testid="user-photo"] img, img.user-photo'
    );
    expect(img).toBeTruthy();
  });
});
