import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { User } from '../user-interface/user-interface';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit, OnDestroy {
  currUser: User = this.storage.getCurrUserInfo();
  emailCopy: string = this.currUser.email;

  $subscription: Subscription = new Subscription();

  constructor (
    private storage: StorageService,
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
    }
  }
  
  ngOnInit() {
    this.$subscription.add(
      this.storage.currUser.subscribe(user => {
        this.currUser = user;
        this.emailCopy = user.email;
      })
    );
  }

  ngOnDestroy() {
    this.$subscription.unsubscribe();
  }
}
