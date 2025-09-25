import { UsersService } from '@services/users/users-service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersTable } from './users-table';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@services/auth/auth-service';
import { of } from 'rxjs';
import { mockUsersTableData } from './MockUsersTableData';

describe('UsersTable', () => {
  let component: UsersTable;
  let fixture: ComponentFixture<UsersTable>;
  let usersServiceSpy: jasmine.SpyObj<UsersService>;

  beforeEach(async () => {
    usersServiceSpy = jasmine.createSpyObj('UsersService', [
      'getUsers',
      'getProfile',
    ]);

    usersServiceSpy.getUsers.and.returnValue(of(mockUsersTableData));
    usersServiceSpy.getProfile.and.returnValue(
      of({ id: 1, name: 'Tester', email: 'user@test.com' })
    );

    await TestBed.configureTestingModule({
      imports: [UsersTable],
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersServiceSpy },
        HttpClient,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render user rows', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const userRows = compiled.querySelectorAll('tr.user-row');
    expect(userRows.length).toBe(component.users.length);
  });

  it('should set user profile on init', () => {
    expect(component.user).toBeTruthy();
    expect(component.user?.name).toBe('Tester');
  });

  it('should call getUsers once on init', () => {
    expect(usersServiceSpy.getUsers).toHaveBeenCalledTimes(1);
  });

  it('should call getProfile once on init', () => {
    expect(usersServiceSpy.getProfile).toHaveBeenCalledTimes(1);
  });
});
