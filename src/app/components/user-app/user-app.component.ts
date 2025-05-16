import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-user-app',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css'
})
export class UserAppComponent implements OnInit {

  users: User[] = [];

  userSelected: User;

  constructor(private service: UserService, private sharingData: SharingDataService) {
    this.userSelected = new User();
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users);
    this.addUser();
    this.removeUser();
    this.setSelectedUser();
  }

  addUser() {
    this.sharingData.userEventEmitter.subscribe(user => {
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
    });
    this.userSelected = new User();
  }

  removeUser(): void {
    this.sharingData.idUserEventEmitter.subscribe(id => {
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
    });
  }

  setSelectedUser(): void {
    this.sharingData.userEventEmitter.subscribe(user => this.userSelected = { ...user })
  }
}
