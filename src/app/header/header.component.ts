import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { User } from '../user-interface/user-interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [StorageService]
})
export class HeaderComponent implements OnInit, OnDestroy{
  currUser: User = this.storage.getCurrUserInfo();
  allRecepi: string[] = [];
  allCookbooks: string[] = [];
  
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

  showFoundedRecepies(event: any) {
    if (event.target.value < 3) {
      this.allRecepi = [];
    } else {
      this.allRecepi = this.storage.getCurrUserRecepiesNames(event.target.value, true);
    }
  }

  showRecepi(recepiName: string) {
    this.allRecepi = [];
    this.storage.showRecepi(true, this.storage.getRecepiByTitle(recepiName));
  }
}
