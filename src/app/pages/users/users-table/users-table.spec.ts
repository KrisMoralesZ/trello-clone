import { UsersService } from '@services/users/users-service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTable } from './users-table';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@services/auth/auth-service';
import { of } from 'rxjs';

describe('UsersTable', () => {
  let component: UsersTable;
  let fixture: ComponentFixture<UsersTable>;

  beforeEach(async () => {
    const usersServiceSpy = jasmine.createSpyObj('UsersService', [
      'getUsers',
      'getProfile',
    ]);
    usersServiceSpy.getUsers.and.returnValue(
      of([{ id: 1, name: 'Test User', email: 'test@mail.com', avatar: 'url' }])
    );
    usersServiceSpy.getProfile.and.returnValue(
      of({ id: 1, username: 'Tester' })
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
});
