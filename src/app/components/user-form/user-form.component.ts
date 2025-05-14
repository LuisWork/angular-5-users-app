import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  @Input() user: User;

  @Output() userEventEmitter: EventEmitter<User> = new EventEmitter();

  @Output() openEventEmitter: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.user = new User();
  }

  onSubmit(userForm: NgForm): void {
    if (userForm.valid) {
      this.userEventEmitter.emit(this.user);
      userForm.reset();
      userForm.resetForm();
    }
  }

  onClear(userForm: NgForm): void {
    userForm.resetForm();
  }

  onOpenClose(): void {
    this.openEventEmitter.emit();
  }

}
