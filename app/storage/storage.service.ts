import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cookbook } from '../cookbook-interface/cookbook-interface';
import { Recepi } from '../recepi-interface/recepi-interface';
import { User } from '../user-interface/user-interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storage = window.localStorage;
  currUser: Subject<User> = new Subject();
  users: Subject<User[]> = new Subject();

  constructor() {}

  onSignIn(email: string, password: string): boolean {
    const currUser = this.checkUserLoginPass(email, password);

    if (currUser) {
      this.storage['currentUser'] = JSON.stringify(currUser);

      return true;
    } else {
      return false;
    }
  }

  checkUserLoginPass(email: string, password: string): User | null {
    const users: User[] = JSON.parse(this.storage['user']);
    let matched: User | null = null;

    users.forEach(element => {
      if(element.email === email && element.password === password) {
        matched = element;
      }
    });

    return matched;
  }

  onSignUp(email: string, password: string): boolean {
    const initCurrUser: User = {
      username: 'Anonim',
      email: email,
      password: password,
      photo: '',
      cookbooks: [],
      recepies: []
    }

    if (this.checkCurrUsersLogin(email)) {
      return false;
    } else {
      let usersArr: User[] = JSON.parse(this.storage['user']);

      usersArr.push(initCurrUser);
      
      this.storage['user'] = JSON.stringify(usersArr);
      this.storage['currentUser'] = JSON.stringify(initCurrUser);

      return true;
    }
  }

  checkUser(): boolean {
    return this.storage['currentUser'];
  }

  getCurrUserInfo(): User {
    return JSON.parse(this.storage['currentUser']);
  }

  checkCurrUsersLogin(email: string): boolean {
    const users: User[] = JSON.parse(this.storage['user']);
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

    let users: User[] = JSON.parse(this.storage['user']);
    const index: number = this.findIndexOfUser(email);

    users.splice(index, 1, currUser);

    this.storage['user'] = JSON.stringify(users);
    this.storage['currentUser'] = JSON.stringify(currUser);

    this.currUser.next(currUser);
    this.users.next(users);
    
    return true;
  }
  
  getRecepiByTitle(label: string): Recepi {
    const recepies: Recepi[] = this.getCurrUserInfo().recepies;
    let index: number = -1;
    for(let i = 0; i < recepies.length; i++) {
      if (recepies[i].title === label) {
        index = i;
      }
    }

    return recepies[index];
  }

  getCurrUserRecepiesNames(substr?: string): string[] {
    const recepies = this.getCurrUserInfo().recepies;
    let recepiesNames: string[] = [];
    if (substr) {
      recepies.forEach((elem) => {
        if (elem.title.toLowerCase().indexOf(substr.toLowerCase()) >= 0) {
          recepiesNames.push(elem.title);
        }
      });
    } else {
      recepies.forEach((elem) => {
        recepiesNames.push(elem.title);
      });
    }

    return recepiesNames;
  }

  creationShow(show: boolean, cookbook?: Cookbook): void {
    const creation = document.getElementById('creation');
    const creationButton = document.getElementById('creationCookbookButton');

    show ? creation?.classList.remove('hidden') : creation?.classList.add('hidden');

    if (cookbook) {
      creationButton?.classList.add('update');

      const cookbookTitle: any = document.getElementById('cookbookTitle');
      const cookbookDescription: any = document.getElementById('cookbookDescription');

      cookbookDescription.value = cookbook.description;
      cookbookTitle.value = cookbook.label;

      this.storage['updateCookbook'] = JSON.stringify(cookbook);
    }
  }

  creationShowRecepie(show: boolean, recepi?: Recepi): void {
    const creation = document.getElementById('creationRecepi');
    const creationButton = document.getElementById('creationRecepiButton');

    show ? creation?.classList.remove('hidden') : creation?.classList.add('hidden');

    if (recepi) {
      creationButton?.classList.add('update');

      const recepiTitle: any = document.getElementById('recepiTitle');
      const recepiDirections: any = document.getElementById('recepiDirections');
      const recepiDescription: any = document.getElementById('recepiDescription');

      recepiDescription.value = recepi.description;
      recepiDirections.value = recepi.directions;
      recepiTitle.value = recepi.title;

      this.storage['updateRecepi'] = JSON.stringify(recepi);
    }
  }

  addCookbook(label: string, description: string, photo: string, recepiNames: string[]): boolean {
    const newCookbook: Cookbook = {
      label: label,
      author: this.getCurrUserInfo().email,
      description: description,
      photo: photo,
      likes: 0,
      comments: 0,
      views: 0,
      recepiNames: recepiNames
    };

    let currUser: User = JSON.parse(this.storage['currentUser']);
    let matched: boolean = true;
    
    currUser.cookbooks.forEach(element => {
      if (element.label === newCookbook.label) {
        matched = false;
      }
    });

    if (!matched) {
      return false;
    }

    currUser.cookbooks.push(newCookbook);

    let users: User[] = JSON.parse(this.storage['user']);
    let index: number = this.findIndexOfUser(currUser.email);

    users.splice(index, 1, currUser);

    this.storage['user'] = JSON.stringify(users);
    this.storage['currentUser'] = JSON.stringify(currUser);

    this.currUser.next(currUser);
    this.users.next(users);
    
    return true;
  }

  addRecepi(label: string, description: string, photo: string, directions: string, ingridients: string[]): boolean {
    const newRecepi: Recepi = {
      title: label,
      author: this.getCurrUserInfo().email,
      description: description,
      directions: directions,
      photo: photo,
      ingridiens: ingridients,
      likes: 0,
      comments: 0,
      views: 0
    };

    let currUser: User = JSON.parse(this.storage['currentUser']);
    let matched: boolean = true;

    currUser.recepies.forEach(element => {
      if (element.title === newRecepi.title) {
        matched = false;
      }
    });

    if (!matched) {
      return false;
    }

    currUser.recepies.push(newRecepi);

    let users: User[] = JSON.parse(this.storage['user']);
    let index: number = this.findIndexOfUser(currUser.email);

    users.splice(index, 1, currUser);

    this.storage['user'] = JSON.stringify(users);
    this.storage['currentUser'] = JSON.stringify(currUser);

    this.currUser.next(currUser);
    this.users.next(users);
    
    return true;
  }

  updateCookbook(label: string, description: string, photo: string): boolean {
    let uploadCookbook: Cookbook = JSON.parse(this.storage['updateCookbook']);

    if (this.deleteCookbook(uploadCookbook)) {
      if (photo) {
        uploadCookbook.photo = photo;
      }
      if (label) {
        uploadCookbook.label = label;
      }
      if (description) {
        uploadCookbook.description = description;
      }

      let currUser: User = JSON.parse(this.storage['currentUser']);
      let mathched: boolean = true;

      currUser.cookbooks.forEach(element => {
        if (element.label === uploadCookbook.label) {
          mathched = false;
        }
      });

      if (!mathched) {
        return false;
      }

      currUser.cookbooks.push(uploadCookbook);

      let users: User[] = JSON.parse(this.storage['user']);
      let index: number = this.findIndexOfUser(currUser.email);

      users.splice(index, 1, currUser);

      this.storage['user'] = JSON.stringify(users);
      this.storage['currentUser'] = JSON.stringify(currUser);
      this.storage.removeItem('updateCookbook');

      this.currUser.next(currUser);
      this.users.next(users);

      return true;
    }
    else {
      return false;
    }
  }

  updateRecepi(label: string, description: string, photo: string, directions: string, ingridients: string[]): boolean {
    let uploadRecepi: Recepi = JSON.parse(this.storage['updateRecepi']);

    if (this.deleteRecepi(uploadRecepi)) {
      if (photo) {
        uploadRecepi.photo = photo;
      }
      if (label) {
        uploadRecepi.title = label;
      }
      if (description) {
        uploadRecepi.description = description;
      }
      if (directions) {
        uploadRecepi.directions = directions;
      }
      if (ingridients.length) {
        uploadRecepi.ingridiens = ingridients;
      }

      let currUser: User = JSON.parse(this.storage['currentUser']);
      let mathched: boolean = true;

      currUser.recepies.forEach(element => {
        if (element.title === uploadRecepi.title) {
          mathched = false;
        }
      });

      if (!mathched) {
        return false;
      }

      currUser.recepies.push(uploadRecepi);

      let users: User[] = JSON.parse(this.storage['user']);
      let index: number = this.findIndexOfUser(currUser.email);

      users.splice(index, 1, currUser);

      this.storage['user'] = JSON.stringify(users);
      this.storage['currentUser'] = JSON.stringify(currUser);
      this.storage.removeItem('updateRecepi');

      this.currUser.next(currUser);
      this.users.next(users);

      return true;
    }
    else {
      return false;
    }
  }

  deleteCookbook(cookbook: Cookbook): boolean {
    let currUser: User = JSON.parse(this.storage['currentUser']);
    let indexCookbook: number = 0;

    for (let i = 0; i < currUser.cookbooks.length; i++) {
      if (currUser.cookbooks[i].label === cookbook.label) {
        indexCookbook = i;
      }
    }

    currUser.cookbooks.splice(indexCookbook, 1);

    let users: User[] = JSON.parse(this.storage['user']);
    let index: number = this.findIndexOfUser(currUser.email);

    users.splice(index, 1, currUser);

    this.storage['user'] = JSON.stringify(users);
    this.storage['currentUser'] = JSON.stringify(currUser);

    this.currUser.next(currUser);
    this.users.next(users);
    
    return true;
  }

  deleteRecepi(recepi: Recepi): boolean {
    let currUser: User = JSON.parse(this.storage['currentUser']);
    let indexRecepi: number = 0;

    for (let i = 0; i < currUser.recepies.length; i++) {
      if (currUser.recepies[i].title === recepi.title) {
        indexRecepi = i;
      }
    }

    currUser.recepies.splice(indexRecepi, 1);

    let users: User[] = JSON.parse(this.storage['user']);
    let index: number = this.findIndexOfUser(currUser.email);

    users.splice(index, 1, currUser);

    this.storage['user'] = JSON.stringify(users);
    this.storage['currentUser'] = JSON.stringify(currUser);

    this.currUser.next(currUser);
    this.users.next(users);
    
    return true;
  }

  findIndexOfUser(email: string): number {
    const users: User[] = JSON.parse(this.storage['user']);
    let index: number = -1;

    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        index = i;
      }
    }

    return index;
  }
}