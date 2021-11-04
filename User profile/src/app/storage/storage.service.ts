import { Injectable } from '@angular/core';

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
      this.localStore['currentUser'] = JSON.stringify([currUser]);

      return true;
    } else {
      return false;
    }
  }

  checkUserLoginPass(email: string, password: string): string[] | null {
    let users: string[][] = JSON.parse(this.localStore['user']);
    let matched: string[] | null = null;

    users.forEach(element => {
      if(element[0] === email && element[1] === password) {
        matched = element;
      }
    });

    return matched;
  }

  onSignUp(email: string, password: string): boolean {
    let data: string[] = [email, password, 'Anonim'];

    if (!this.localStore['user']) {
      this.localStore['user'] = JSON.stringify([data]);
      this.localStore['currentUser'] = JSON.stringify([data]);

      return true;
    } else {
        if (this.checkCurrUsersLogin(email)) {
          return false;
        } else {
          let usersArr: string[][] = JSON.parse(this.localStore['user']);
          usersArr.push(data);
          this.localStore['user'] = JSON.stringify(usersArr);
          this.localStore['currentUser'] = JSON.stringify([data]);

          return true;
        }
    }
  }

  checkCurrUsersLogin(email: string): boolean {
    let users: string[][] = JSON.parse(this.localStore['user']);
    let matched: boolean = false;

    users.forEach(element => {
      if (element[0] === email) {
        matched = true;
      }
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

  getCurrUserInfo(): string[] {
    return JSON.parse(this.localStore['currentUser']);
  }

  saveCurrUserChanges(email: string, currUser: string[]): void {
    let users: string[][] = JSON.parse(this.localStore['user']);
    let index: number = 0;

    for (let i = 0; i < users.length; i++) {
      if (users[i][0] === email) {
        index = i;
      }
    }

    users.splice(index, 1, currUser);
    this.localStore['user'] = JSON.stringify(users);
    this.localStore['currentUser'] = JSON.stringify([currUser]);
  }
}
