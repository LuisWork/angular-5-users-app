import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {

  user: User;

  errors: any = {};

  constructor(private sharingData: SharingDataService, private route: ActivatedRoute) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.sharingData.errorsUserFormEventEmitter.subscribe(errors => this.errors = errors);
    this.sharingData.selectUserEventEmitter.subscribe(user => this.user = user);
    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');
      if (id > 0) {
        this.sharingData.findUserByIdEventEmitter.emit(id);
      }
    });
  }

  onSubmit(userForm: NgForm): void {
    this.sharingData.newUserEventEmitter.emit(this.user);
    //userForm.reset();
    //userForm.resetForm();
  }

  onClear(userForm: NgForm): void {
    userForm.resetForm();
  }
}
