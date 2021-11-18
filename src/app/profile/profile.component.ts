import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { User } from '../user-interface/user-interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [StorageService]
})
export class ProfileComponent implements OnDestroy, OnInit{
  currUser: User = this.storage.getCurrUserInfo();

  $subscription: Subscription = new Subscription();

  constructor(
    public storage: StorageService,
    private notifier: NotifierService
  ) { }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.currUser.photo = String(event.target?.result);
        this.storage.saveCurrUserChanges(this.currUser.email, this.currUser);
        this.notifier.notify('success', 'Photo succesfully changed!');
      }
    }
  }

  ngOnInit() {
    this.$subscription.add(
      this.storage.currUser.subscribe(user => {
        this.currUser = user;
      })
    );
  }

  ngOnDestroy() {
    this.$subscription.unsubscribe();
  }
}
