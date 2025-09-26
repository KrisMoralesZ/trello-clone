import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Layout } from './layout';
import { RouterOutlet } from '@angular/router';
import { UsersService } from '@services/users/users-service';
import { AuthService } from '@services/auth/auth-service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('Layout', () => {
  let component: Layout;
  let fixture: ComponentFixture<Layout>;
  let usersService: jasmine.SpyObj<UsersService>;

  beforeEach(async () => {
    const usersServiceSpy = jasmine.createSpyObj('UsersService', [
      'getProfile',
    ]);
    usersServiceSpy.getProfile.and.returnValue(
      of({ id: 1, name: 'Test User' })
    );

    await TestBed.configureTestingModule({
      imports: [Layout, RouterOutlet, HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersServiceSpy },
        HttpClient,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(Layout);
    component = fixture.componentInstance;
    usersService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProfile on init', () => {
    expect(usersService.getProfile).toHaveBeenCalled();
  });

  it('should render navbar component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
  });

  it('should render router-outlet component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
