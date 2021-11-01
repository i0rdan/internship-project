import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  localStore = window.localStorage;
  constructor() {}

  onSignIn(login: string, password: string): boolean {
    let data: string[] = [login, password];

    if(this.localStore['user'] && this.checkUserLoginPass(login, password)) {
      this.localStore['currentUser'] = JSON.stringify([data]);
      return true;
    }

    else return false;
  }

  checkUserLoginPass(login: string, password: string): boolean {
    let users: string[][] = JSON.parse(this.localStore['user']);
    let matched: boolean = false;

    users.forEach(element => {
      if(element[0] === login && element[1] === password) matched = true;
    });

    return matched;
  }

  onSignUp(login: string, password: string): boolean {
    let data: string[] = [login, password];

    if(!this.localStore['user']) {
      this.localStore['user'] = JSON.stringify([data]);
      this.localStore['currentUser'] = JSON.stringify([data]);
      return true;
    }

    else {
      if(this.checkCurrUsersLogin(login)) {
        return false;
      }

      else {
        let usersArr: string[][] = JSON.parse(this.localStore['user']);
        usersArr.push(data);
        this.localStore['user'] = JSON.stringify(usersArr);
        this.localStore['currentUser'] = JSON.stringify([data]);
        return true;
      }
    }
  }

  checkCurrUsersLogin(login: string): boolean {
    let users: string[][] = JSON.parse(this.localStore['user']);
    let matched: boolean = false;

    users.forEach(element => {
      if(element[0] === login) matched = true;
    });

    return matched;
  }

  checkUser(): boolean {
    return this.localStore['currentUser'];
  }

  clearCurrUser(): void {
    this.localStore['currentUser'] = '';
  } 

  getCurrUserLogin(): string {
    return JSON.parse(this.localStore['currentUser'])[0][0];
  }
}
