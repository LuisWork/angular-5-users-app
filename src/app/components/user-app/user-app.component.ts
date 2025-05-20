import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
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

  constructor(
    private router: Router,
    private service: UserService,
    private sharingData: SharingDataService) {
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users);
    this.addUser();
    this.removeUser();
    this.findUserById();
  }

  findUserById() {
    this.sharingData.findUserByIdEventEmitter.subscribe(id => {
      const user = this.users.find(user => user.id == id);
      this.sharingData.selectUserEventEmitter.emit(user);
    })
  }

  addUser() {
    this.sharingData.newUserEventEmitter.subscribe(user => {
      if (user.id > 0) {
        this.service.update(user).subscribe({
          next: (userUpdated) => {
            this.users = this.users.map(u => (u.id == userUpdated.id) ? { ...userUpdated } : u);
            this.router.navigate(['/users'], { state: { users: this.users } });
            Swal.fire({
              title: "User Updated",
              text: "User Updated Successfully",
              icon: "success"
            });
          }, error: (err) => {
            if (err.status == 400) {
              this.sharingData.errorsUserFormEventEmitter.emit(err.error);
            }
          }
        });

      } else {
        this.service.create(user).subscribe({
          next: (userNew) => {
            console.log(user)
            this.users = [... this.users, { ...userNew }];
            this.router.navigate(['/users'], { state: { users: this.users } });
            Swal.fire({
              title: "User Created",
              text: "User Created Successfully",
              icon: "success"
            });
          }, error: (err) => {
            if (err.status == 400) {
              this.sharingData.errorsUserFormEventEmitter.emit(err.error);
            }
          }
        });
      }
    });
  }

  removeUser(): void {
    this.sharingData.idUserEventEmitter.subscribe(id => {
      Swal.fire({
        title: "Are you sure you want delete user?",
        text: "Warning: This action is permanent. Are you sure you want to continue?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.remove(id).subscribe(() => {
            this.users = this.users.filter(user => user.id != id);
            this.router.navigate(['/users/create'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/users'], { state: { users: this.users } });
            });
          });
          Swal.fire({
            title: "User Deleted!",
            text: "The user has been deleted successfully.",
            icon: "success"
          });
        }
      });
    });
  }
}
