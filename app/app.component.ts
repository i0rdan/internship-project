import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  initialUsers = localStorage.getItem('user') ? localStorage.getItem('user') : localStorage.setItem('user', JSON.stringify(
    [
      {
        username: 'Jeka',
        password: '11111111',
        email: 'kazusev2000@mail.ru',
        cookbooks: [],
        recepies: [],
        photo: ''
      }
    ]
  ));
  currentUser = localStorage.getItem('currentUser') ? localStorage.getItem('currentUser') : localStorage.setItem('currentUser', JSON.stringify({}));
}
