import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [StorageService]
})
export class HeaderComponent implements OnInit, OnDestroy{
  currUser = this.storage.getCurrUserInfo();
  
  $subscription: Subscription = new Subscription();

  constructor(public storage: StorageService) { }

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
