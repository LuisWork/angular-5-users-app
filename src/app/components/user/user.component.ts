import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { PaginatorComponent } from '../paginator/paginator.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user',
  imports: [RouterModule, PaginatorComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  title: string = 'Users List';
  users: User[] = [];
  paginator: any = {};

  constructor(
    private service: UserService,
    private sharingData: SharingDataService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
      this.paginator = this.router.getCurrentNavigation()?.extras.state!['paginator'];
    }
  }

  ngOnInit(): void {
    if (this.users == undefined || this.users == null || this.users.length == 0) {
      this.route.paramMap.subscribe(params => {
        const page = +(params.get('page') || '0');
        this.service.findAllPageable(page).subscribe(pageable => {
          this.users = pageable.content as User[];
          this.paginator = pageable;
          this.sharingData.pageUsersEventEmitter.emit({ users: this.users, paginator: this.paginator });
        });
      });
    }
  }

  onRemoveUser(id: number): void {
    this.sharingData.idUserEventEmitter.emit(id);
  }

  onSelectedUser(user: User): void {
    this.router.navigate(['/users/edit', user.id]);
  }

  get admin() {
    return this.authService.isAdmin();
  }


}
