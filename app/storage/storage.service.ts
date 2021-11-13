import { Injectable } from '@angular/core';
import { Cookbook } from '../cookbook-interface/cookbook-interface';
import { Recepi } from '../recepi-interface/recepi-interface';
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
      photo: '',
      cookbooks: [],
      recepies: []
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
    let index: number = this.findIndexOfUser(email);

    users.splice(index, 1, currUser);
    this.localStore['user'] = JSON.stringify(users);
    this.localStore['currentUser'] = JSON.stringify(currUser);
    
    return true;
  }

  getCurrUserCookbooks(): Cookbook[] {
    return JSON.parse(this.localStore['currentUser']).cookbooks;
  }

  getCurrUserRecepies(): Recepi[] {
    return JSON.parse(this.localStore['currentUser']).recepies;
  }
  
  getRecepiByTitle(label: string): Recepi {
    let recepies: Recepi[] = this.getCurrUserRecepies();
    let index: number = -1;
    for(let i = 0; i < recepies.length; i++) {
      if (recepies[i].title === label) {
        index = i;
      }
    }

    return recepies[index];
  }

  getCurrUserRecepiesNames(substr?: string): string[] {
    let recepies = this.getCurrUserRecepies();
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
    let creation = document.getElementById('creation');
    let creationButton = document.getElementById('creationCookbookButton');
    show ? creation?.classList.remove('hidden') : creation?.classList.add('hidden');
    if (cookbook) {
      creationButton?.classList.add('update');
      let cookbookTitle: any = document.getElementById('cookbookTitle');
      let cookbookDescription: any = document.getElementById('cookbookDescription');
      cookbookDescription.value = cookbook.description;
      cookbookTitle.value = cookbook.label;
      this.localStore['updateCookbook'] = JSON.stringify(cookbook);
    }
  }

  creationShowRecepie(show: boolean, recepi?: Recepi): void {
    let creation = document.getElementById('creationRecepi');
    show ? creation?.classList.remove('hidden') : creation?.classList.add('hidden');
    let creationButton = document.getElementById('creationRecepiButton');
    if (recepi) {
      creationButton?.classList.add('update');
      let recepiTitle: any = document.getElementById('recepiTitle');
      let recepiDirections: any = document.getElementById('recepiDirections');
      let recepiDescription: any = document.getElementById('recepiDescription');
      recepiDescription.value = recepi.description;
      recepiDirections.value = recepi.directions;
      recepiTitle.value = recepi.title;
      this.localStore['updateRecepi'] = JSON.stringify(recepi);
    }
  }

  addCookbook(label: string, description: string, photo: string, recepiNames: string[]): boolean {
    let newCookbook: Cookbook = {
      label: label,
      author: this.getCurrUserLogin(),
      description: description,
      photo: photo,
      likes: 0,
      comments: 0,
      views: 0,
      recepiNames: recepiNames
    };
    let currUser: User = JSON.parse(this.localStore['currentUser']);
    let mathched: boolean = true;
    currUser.cookbooks.forEach(element => {
      if (element.label === newCookbook.label) {
        mathched = false;
      }
    });

    if (!mathched) {
      return false;
    }

    currUser.cookbooks.push(newCookbook);
    let users: User[] = JSON.parse(this.localStore['user']);
    let index: number = this.findIndexOfUser(currUser.email);

    users.splice(index, 1, currUser);
    this.localStore['user'] = JSON.stringify(users);
    this.localStore['currentUser'] = JSON.stringify(currUser);
    
    return true;
  }

  addRecepi(label: string, description: string, photo: string, directions: string, ingridients: string[]): boolean {
    let newRecepi: Recepi = {
      title: label,
      author: this.getCurrUserLogin(),
      description: description,
      directions: directions,
      photo: photo,
      ingridiens: ingridients,
      likes: 0,
      comments: 0,
      views: 0
    };
    let currUser: User = JSON.parse(this.localStore['currentUser']);
    let mathched: boolean = true;
    currUser.recepies.forEach(element => {
      if (element.title === newRecepi.title) {
        mathched = false;
      }
    });

    if (!mathched) {
      return false;
    }

    currUser.recepies.push(newRecepi);
    let users: User[] = JSON.parse(this.localStore['user']);
    let index: number = this.findIndexOfUser(currUser.email);

    users.splice(index, 1, currUser);
    this.localStore['user'] = JSON.stringify(users);
    this.localStore['currentUser'] = JSON.stringify(currUser);
    
    return true;
  }

  updateCookbook(label: string, description: string, photo: string): boolean {
    let uploadCookbook: Cookbook = JSON.parse(this.localStore['updateCookbook']);
    if (this.deleteCookbook(uploadCookbook)) {
      if(photo) {
        uploadCookbook.photo = photo;
      }
      if(label) {
        uploadCookbook.label = label;
      }
      if(description) {
        uploadCookbook.description = description;
      }
      let currUser: User = JSON.parse(this.localStore['currentUser']);
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
      let users: User[] = JSON.parse(this.localStore['user']);
      let index: number = this.findIndexOfUser(currUser.email);

      users.splice(index, 1, currUser);
      this.localStore['user'] = JSON.stringify(users);
      this.localStore['currentUser'] = JSON.stringify(currUser);
      this.localStore.removeItem('updateCookbook');

      return true;
    }
    else {
      return false;
    }
  }

  updateRecepi(label: string, description: string, photo: string, directions: string, ingridients: string[]): boolean {
    let uploadRecepi: Recepi = JSON.parse(this.localStore['updateRecepi']);
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
      let currUser: User = JSON.parse(this.localStore['currentUser']);
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
      let users: User[] = JSON.parse(this.localStore['user']);
      let index: number = this.findIndexOfUser(currUser.email);

      users.splice(index, 1, currUser);
      this.localStore['user'] = JSON.stringify(users);
      this.localStore['currentUser'] = JSON.stringify(currUser);
      this.localStore.removeItem('updateRecepi');

      return true;
    }
    else {
      return false;
    }
  }

  deleteCookbook(cookbook: Cookbook): boolean {
    let currUser: User = JSON.parse(this.localStore['currentUser']);
    let indexCookbook: number = 0;

    for (let i = 0; i < currUser.cookbooks.length; i++) {
      if (currUser.cookbooks[i].label === cookbook.label) {
        indexCookbook = i;
      }
    }

    currUser.cookbooks.splice(indexCookbook, 1);

    let users: User[] = JSON.parse(this.localStore['user']);
    let index: number = this.findIndexOfUser(currUser.email);

    users.splice(index, 1, currUser);
    this.localStore['user'] = JSON.stringify(users);
    this.localStore['currentUser'] = JSON.stringify(currUser);
    
    return true;
  }

  deleteRecepi(recepi: Recepi): boolean {
    let currUser: User = JSON.parse(this.localStore['currentUser']);
    let indexRecepi: number = 0;

    for (let i = 0; i < currUser.recepies.length; i++) {
      if (currUser.recepies[i].title === recepi.title) {
        indexRecepi = i;
      }
    }

    currUser.recepies.splice(indexRecepi, 1);

    let users: User[] = JSON.parse(this.localStore['user']);
    let index: number = this.findIndexOfUser(currUser.email);

    users.splice(index, 1, currUser);
    this.localStore['user'] = JSON.stringify(users);
    this.localStore['currentUser'] = JSON.stringify(currUser);
    
    return true;
  }

  findIndexOfUser(email: string): number {
    let users: User[] = JSON.parse(this.localStore['user']);
    let index: number = -1;

    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        index = i;
      }
    }

    return index;
  }
}