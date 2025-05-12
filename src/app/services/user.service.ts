import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    {
      id: 1,
      name: 'Luis',
      lastname: 'Alejandro',
      email: 'luis@email.com',
      username: 'Radyk',
      password: '12345'
    },
    {
      id: 2,
      name: 'Camila',
      lastname: 'Ulloa',
      email: 'camila@email.com',
      username: 'Rize',
      password: '12345'
    },
    {
      id: 3,
      name: 'Javier',
      lastname: 'Vejar',
      email: 'javier@email.com',
      username: 'Understrik',
      password: '12345'
    },
  ];

  constructor() { }

  findAll(): Observable<User[]> {
    return of(this.users);
  }
}
