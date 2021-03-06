import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cookbook } from '../cookbook-interface/cookbook-interface';
import { StorageService } from '../storage/storage.service';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-cookbooks',
  templateUrl: './profile-cookbooks.component.html',
  styleUrls: ['./profile-cookbooks.component.css']
})
export class ProfileCookbooksComponent implements OnInit, OnDestroy{
  cookbooks: Cookbook[] = this.storage.getCurrUserInfo().cookbooks;
  currUserMail: string = this.storage.getCurrUserInfo().email;

  $subscription: Subscription = new Subscription();
  
  constructor(
    public storage: StorageService,
    private notifier: NotifierService
  ) { }

  deleteCookbook(cookbook: Cookbook) {
    if (this.storage.deleteCookbook(cookbook)) {
      this.notifier.notify('success', 'Succesfully deleted');
    } else {
      this.notifier.notify('error', 'Error');
    }
  }

  updateCookbook(cookbook: Cookbook) {
    this.storage.updateBookShow(true, cookbook);
  }

  likeUnlikeBook(author: string, label: string) {
    this.storage.likeUnlikeBook(author, label, this.currUserMail);
  }

  ngOnInit() {
    this.$subscription.add(
      this.storage.currUser.subscribe(user => {
        this.cookbooks = user.cookbooks;
      })
    );
  }

  ngOnDestroy() {
    this.$subscription.unsubscribe();
  }

  showCookbook(show: boolean, cookbook: Cookbook) {
    this.storage.viewCookbook(cookbook.author, cookbook.label, this.currUserMail);
    this.storage.showCookbook(show, cookbook);
  }
}
