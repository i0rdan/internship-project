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
  cookbookUpdate: Subject<Cookbook> = new Subject();
  recepiUpdate: Subject<Recepi> = new Subject();

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

    currUser.recepies.forEach(recepi => {
      const index = recepi.likes.indexOf(email);

      recepi.author = currUser.email;

      if (index >= 0) {
        recepi.likes.splice(index, 1, currUser.email);
      }
    });

    currUser.cookbooks.forEach(cookbook => {
      const index = cookbook.likes.indexOf(email);

      cookbook.author = currUser.email;

      if (index >= 0) {
        cookbook.likes.splice(index, 1, currUser.email);
      }
    });

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

  creationShow(show: boolean): void {
    const creation = document.getElementById('creation');

    show ? creation?.classList.remove('hidden') : creation?.classList.add('hidden');
  }

  creationShowRecepie(show: boolean): void {
    const creation = document.getElementById('creationRecepi');

    show ? creation?.classList.remove('hidden') : creation?.classList.add('hidden');
  }

  updateBookShow(show: boolean, cookbook?: Cookbook) {
    const update = document.getElementById('updateBook');

    if (cookbook) {
      this.cookbookUpdate.next(cookbook);
      this.storage['updateCookbook'] = JSON.stringify(cookbook);
    }

    show ? update?.classList.remove('hidden') : update?.classList.add('hidden');
  }

  updateRecepiShow(show: boolean, recepi?: Recepi) {
    const update = document.getElementById('updateRecepi');

    if (recepi) {
      this.recepiUpdate.next(recepi);
      this.storage['updateRecepi'] = JSON.stringify(recepi);
    }

    show ? update?.classList.remove('hidden') : update?.classList.add('hidden');
  }

  addCookbook(label: string, description: string, photo: string, recepiNames: string[]): boolean {
    const newCookbook: Cookbook = {
      label: label,
      author: this.getCurrUserInfo().email,
      description: description,
      photo: photo,
      likes: [],
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
      likes: [],
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

  updateCookbook(label: string, description: string, photo: string, addRecepiToBook: string[]): boolean {
    let uploadCookbook: Cookbook = JSON.parse(this.storage['updateCookbook']);

    if (this.deleteCookbook(uploadCookbook)) {
      this.addCookbook(label, description, photo, addRecepiToBook);
      this.storage.removeItem('updateCookbook');

      return true;
    }
    else {
      return false;
    }
  }

  updateRecepi(label: string, description: string, photo: string, directions: string, ingridients: string[]): boolean {
    let uploadRecepi: Recepi = JSON.parse(this.storage['updateRecepi']);

    if (this.deleteRecepi(uploadRecepi)) {
      this.addRecepi(label, description, photo, directions, ingridients);
      this.storage.removeItem('updateRecepi');

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
    currUser.cookbooks.forEach(book => {
      const indexOfRecepi = book.recepiNames.indexOf(recepi.title);

      if (indexOfRecepi >= 0) {
        book.recepiNames.splice(indexOfRecepi, 1);
      }
    });

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

  likeUnlikeBook(author: string, label: string, whoLike: string) {
    const users: User[] = JSON.parse(this.storage['user']);
    let index: number = this.findIndexOfUser(author);

    users[index].cookbooks.forEach(book => {
      if (book.label === label) {
        let indexOfLiker = book.likes.indexOf(whoLike);

        indexOfLiker < 0 ? book.likes.push(whoLike) : book.likes.splice(indexOfLiker, 1);
      }
    });

    if (author === whoLike) {
      const currUser = users[index];

      this.storage['currentUser'] = JSON.stringify(currUser);

      this.currUser.next(currUser);
    }

    this.storage['user'] = JSON.stringify(users);

    this.users.next(users);
  }

  likeUnlikeRecepi(author: string, label: string, whoLike: string) {
    const users: User[] = JSON.parse(this.storage['user']);
    let index: number = this.findIndexOfUser(author);

    users[index].recepies.forEach(recepi => {
      if (recepi.title === label) {
        let indexOfLiker = recepi.likes.indexOf(whoLike);

        indexOfLiker < 0 ? recepi.likes.push(whoLike) : recepi.likes.splice(indexOfLiker, 1);
      }
    });

    if (author === whoLike) {
      const currUser = users[index];

      this.storage['currentUser'] = JSON.stringify(currUser);

      this.currUser.next(currUser);
    }

    this.storage['user'] = JSON.stringify(users);

    this.users.next(users);
  }

  showPassword(email: string): string {
    const indexOfUser = this.findIndexOfUser(email);
    const users: User[] = JSON.parse(this.storage['user']);

    return indexOfUser >= 0 ? users[indexOfUser].password : '';
  }

  changePassword(email: string, password: string) {
    const indexOfUser = this.findIndexOfUser(email);
    const users: User[] = JSON.parse(this.storage['user']);

    if (indexOfUser >= 0) {
      users[indexOfUser].password = password;
      this.storage['user'] = JSON.stringify(users);
      return true;
    } else {
      return false;
    }
  }
}