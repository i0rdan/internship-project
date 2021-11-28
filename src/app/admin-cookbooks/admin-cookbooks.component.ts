import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { Cookbook } from '../cookbook-interface/cookbook-interface';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-admin-cookbooks',
  templateUrl: './admin-cookbooks.component.html',
  styleUrls: ['./admin-cookbooks.component.css']
})
export class AdminCookbooksComponent implements OnInit, OnDestroy {
  cookbooks: Cookbook[] = this.storage.getAllCookbooks();
  currUserMail: string = this.storage.getCurrUserInfo().email;
  
  $subscription: Subscription = new Subscription();
  
  constructor(
    public storage: StorageService,
    private notifier: NotifierService,
  ) { }

  deleteCookbook(cookbook: Cookbook) {
    if (this.storage.deleteCookbook(cookbook)) {
      this.notifier.notify('success', 'Succesfully deleted');
    } else {
      this.notifier.notify('error', 'Error');
    }
  }

  likeUnlikeBook(author: string, label: string) {
    this.storage.likeUnlikeBook(author, label, this.currUserMail);
  }

  ngOnInit() {
    this.$subscription.add(
      this.storage.users.subscribe(users => {
        this.cookbooks = [];
        users.forEach(user => {
          this.cookbooks = this.cookbooks.concat(user.cookbooks);
        });
      })
    );
  }

  ngOnDestroy() {
    this.$subscription.unsubscribe();
  }

  showCookbook(show: boolean, cookbook: Cookbook) {
    this.storage.viewCookbook(cookbook.author, cookbook.label, this.currUserMail)
    this.storage.showCookbook(show, cookbook);
  }

  sortBooks(event: HTMLParagraphElement) {
    let sorting: string | null = event.textContent;

    if (sorting?.split(' ')[1] === '(Highest)') {
      event.textContent = 'Sort (Lowest)';

      this.cookbooks = this.cookbooks.sort((book1, book2) => {
        return book1.views.length - book2.views.length
      });
    } else {
      event.textContent = 'Sort (Highest)';

      this.cookbooks = this.cookbooks.sort((book1, book2) => {
        return book2.views.length - book1.views.length
      });
    }
  }

}
