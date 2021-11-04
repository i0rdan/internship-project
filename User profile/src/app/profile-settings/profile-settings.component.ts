import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent {
  user = this.storage.getCurrUserInfo();
  currUser = {
    userEmail: this.user[0][0],
    userPassword: this.user[0][1],
    userName: this.user[0][2]
  }

  constructor (
    private storage:StorageService,
    private route: Router) { }

  show(event: any, userInfo:HTMLInputElement) {
    if (userInfo.disabled) {
      userInfo.disabled = false;
      event.target.textContent = 'Save changes';
    } else {
        //validation
        userInfo.disabled = true;
        switch(userInfo.className) {
          case ('name'):
            this.currUser.userName = userInfo.value;
            event.target.textContent = 'Edit';
            break;
          case ('mail'):
            this.currUser.userEmail = userInfo.value;
            event.target.textContent = 'Edit';
            break;
          case ('password'):
            this.currUser.userPassword = userInfo.value;
            event.target.textContent = 'Change password';
            break;
        }
        this.storage.saveCurrUserChanges(this.user[0][0], [this.currUser.userEmail, this.currUser.userPassword, this.currUser.userName]);
        this.route.routeReuseStrategy.shouldReuseRoute = () => false;
        this.route.onSameUrlNavigation = 'reload';
        this.route.navigate(['/profile/settings']);
    }
  }
}
