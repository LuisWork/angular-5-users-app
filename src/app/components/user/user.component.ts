import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  @Input() users: User[] = [];

  @Output() idUserEventEmitter: EventEmitter<number> = new EventEmitter();

  onRemoveUser(id: number): void {

    this.idUserEventEmitter.emit(id);
  }
}
