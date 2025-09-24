import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '@components/navbar/navbar';
import { UsersService } from '@services/users/users-service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Navbar],
  templateUrl: './layout.html',
})
export class Layout {
  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getProfile().subscribe();
  }
}
