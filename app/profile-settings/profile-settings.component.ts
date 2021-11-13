import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { StorageService } from '../storage/storage.service';
import { User } from '../user-interface/user-interface';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent {
  currUser: User = this.storage.getCurrUserInfo();
  emailCopy: string = this.currUser.email;

  constructor (
    private storage: StorageService,
    private route: Router,
    private notifier: NotifierService
    ) { }

  show(event: any, userInfo:HTMLInputElement) {
    if (userInfo.disabled) {
      userInfo.disabled = false;
      event.target.textContent = 'Save changes';
    } else {
        userInfo.disabled = true;
        switch(userInfo.className) {
          case ('name'):
            this.currUser.username = userInfo.value;
            event.target.textContent = 'Edit';
            break;
          case ('mail'):
            this.currUser.email = userInfo.value;
            event.target.textContent = 'Edit';
            break;
          case ('password'):
            this.currUser.password = userInfo.value;
            event.target.textContent = 'Change password';
            break;
        }
        if (this.storage.saveCurrUserChanges(this.emailCopy, this.currUser)) {
          this.notifier.notify('success', `Succesfully changed`);
        } else {
          this.notifier.notify('error', 'Enter correct information!');
        }
        this.route.routeReuseStrategy.shouldReuseRoute = () => false;
        this.route.onSameUrlNavigation = 'reload';
        this.route.navigate(['/profile/settings']);
    }
  }
}
