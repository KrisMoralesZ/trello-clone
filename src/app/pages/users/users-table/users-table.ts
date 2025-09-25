import { Component, inject } from '@angular/core';
import { DataSourceUser } from './data-source';
import { User } from '@models/user.model';
import { UsersService } from '@services/users/users-service';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-users-table',
  imports: [CommonModule, CdkTableModule, MatTableModule],
  templateUrl: './users-table.html',
})
export class UsersTable {
  private userService = inject(UsersService);

  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];
  user: User | null = null;

  ngOnInit() {
    this.getUsers();
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.user = user;
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterData(filterValue.trim().toLowerCase());
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.dataSource.setData(users);
        console.log(users);
      },
    });
  }
}
