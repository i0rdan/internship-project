import { Component } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent {
  userEmail = this.storage.getCurrUserInfo()[0][0];
  userPassword = this.storage.getCurrUserInfo()[0][1];
  userName = this.storage.getCurrUserInfo()[0][2];

  constructor(private storage:StorageService) { }

  show(event: Event, userInfo:HTMLInputElement) {
    // console.log(userInfo.className) потом данные перезаписываем в обьект и отправляем обект на сервис!!!
  }
}
