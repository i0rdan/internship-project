import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cookbook } from '../cookbook-interface/cookbook-interface';
import { Recepi } from '../recepi-interface/recepi-interface';
import { StorageService } from '../storage/storage.service';
import { User } from '../user-interface/user-interface';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit, OnDestroy {
  users: User[] = this.storage.getAllUsersInfo();
  allCookbooks: Cookbook[] = this.storage.getAllCookbooks();
  allRecepi: Recepi[] = this.storage.getAllResepies();

  $subscription: Subscription = new Subscription();

  blockedUsers: User[] = this.users.filter(user => {
    return user.state === 'blocked';
  });

  activeUsers: User[] = this.users.filter(user => {
    return user.state === 'active';
  });

  deletedUsers: User[] = this.users.filter(user => {
    return user.state === 'deleted';
  });

  constructor(public storage: StorageService) { }

  ngOnInit() {
    this.$subscription.add(
      this.storage.users.subscribe(users => {
        this.users = users;

        this.blockedUsers = this.users.filter(user => {
          return user.state === 'blocked';
        });

        this.activeUsers = this.users.filter(user => {
          return user.state === 'active';
        });

        this.deletedUsers = this.users.filter(user => {
          return user.state === 'deleted';
        });

        this.allCookbooks = [];

        this.users.forEach(user => {
          this.allCookbooks = this.allCookbooks.concat(user.cookbooks);
        });

        this.allRecepi = [];

        this.users.forEach(user => {
          this.allRecepi = this.allRecepi.concat(user.recepies);
        });
      })
    );
  }

  ngOnDestroy() {
    this.$subscription.unsubscribe();
  }
}
