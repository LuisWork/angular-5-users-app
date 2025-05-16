import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-user-app',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css'
})
export class UserAppComponent implements OnInit {

  users: User[] = [];

  userSelected: User;

  constructor(private service: UserService) {
    this.userSelected = new User();
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users);
  }

  addUser(user: User) {
    if (user.id > 0) {
      this.users = this.users.map(u => (u.id === user.id) ? { ...user } : u);
    } else {
      this.users = [... this.users, { ...user, id: new Date().getTime() }];
    }
    Swal.fire({
      title: "Good job!",
      text: "User created",
      icon: "success"
    });
    this.userSelected = new User();
  }

  removeUser(id: number): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.users = this.users.filter(user => user.id != id);
        Swal.fire({
          title: "Deleted!",
          text: "Your user has been deleted.",
          icon: "success"
        });
      }
    });
  }

  setSelectedUser(user: User): void {
    this.userSelected = { ...user };
  }
}
