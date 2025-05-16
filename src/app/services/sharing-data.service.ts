import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _idUserEventEmitter: EventEmitter<number> = new EventEmitter();

  private _userEventEmitter: EventEmitter<User> = new EventEmitter();

  private _findUserByIdEventEmitter: EventEmitter<number> = new EventEmitter();

  private _selectUserEventEmitter: EventEmitter<User> = new EventEmitter();

  constructor() { }

  get userEventEmitter(): EventEmitter<User> {
    return this._userEventEmitter;
  }

  get idUserEventEmitter(): EventEmitter<number> {
    return this._idUserEventEmitter;
  }

  get findUserByIdEventEmitter(): EventEmitter<number> {
    return this._findUserByIdEventEmitter;
  }

  get selectUserEventEmitter(): EventEmitter<User> {
    return this._selectUserEventEmitter;
  }
}
