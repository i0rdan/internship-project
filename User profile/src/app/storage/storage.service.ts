import { Injectable } from '@angular/core';
import { User } from '../user-interface/user-interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  localStore = window.localStorage;
  constructor() {}

  onSignIn(email: string, password: string): boolean {
    if (!this.localStore['user']) {
      return false;
    }

    let currUser = this.checkUserLoginPass(email, password);
    if (currUser) {
      this.localStore['currentUser'] = JSON.stringify(currUser);

      return true;
    } else {
      return false;
    }
  }

  checkUserLoginPass(email: string, password: string): User | null {
    let users: User[] = JSON.parse(this.localStore['user']);
    let matched: User | null = null;

    users.forEach(element => {
      if(element.email === email && element.password === password) {
        matched = element;
      }
    });

    return matched;
  }

  onSignUp(email: string, password: string): boolean {
    let data: User = {
      username: 'Anonim',
      email: email,
      password: password,
      photo: ''
    }

    if (!this.localStore['user']) {
      this.localStore['user'] = JSON.stringify([data]);
      this.localStore['currentUser'] = JSON.stringify(data);

      return true;
    } else {
        if (this.checkCurrUsersLogin(email)) {
          return false;
        } else {
          let usersArr: User[] = JSON.parse(this.localStore['user']);
          usersArr.push(data);
          this.localStore['user'] = JSON.stringify(usersArr);
          this.localStore['currentUser'] = JSON.stringify(data);

          return true;
        }
    }
  }

  checkUser(): boolean {
    return this.localStore['currentUser'];
  }

  clearCurrUser(): void {
    this.localStore['currentUser'] = '';
  } 

  getCurrUserLogin(): string {
    return JSON.parse(this.localStore['currentUser']).email;
  }

  getCurrUserInfo(): User {
    return JSON.parse(this.localStore['currentUser']);
  }

  checkCurrUsersLogin(email: string): boolean {
    let users: User[] = JSON.parse(this.localStore['user']);
    let matched: boolean = false;

    users.forEach(element => {
      if (element.email === email) {
        matched = true;
      }
    });

    return matched;
  }

  checkEmails(currEmail: string, newEmail: string): boolean {
    return currEmail === newEmail ? false : this.checkCurrUsersLogin(newEmail);
  }

  saveCurrUserChanges(email: string, currUser: User): boolean {
    if (currUser.username.length < 4 || currUser.password.length < 8 || this.checkEmails(email, currUser.email)) {
      return false;
    }

    let users: User[] = JSON.parse(this.localStore['user']);
    let index: number = 0;

    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        index = i;
      }
    }

    users.splice(index, 1, currUser);
    this.localStore['user'] = JSON.stringify(users);
    this.localStore['currentUser'] = JSON.stringify(currUser);
    
    return true;
  }
}
