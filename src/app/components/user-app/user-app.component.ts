import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UserComponent } from "../user/user.component";
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-app',
  imports: [UserComponent, UserFormComponent],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css'
})
export class UserAppComponent implements OnInit {

  title: String = 'Users List';

  users: User[] = [];

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users);
  }

  addUser(user: User) {
    this.users = [... this.users, { ...user }];
  }

  removeUser(id: number): void {
    const confirmRemove = confirm('Are you sure you want to delete?');

    if (confirmRemove) {
      this.users = this.users.filter(user => user.id != id);
    }
  }

}
