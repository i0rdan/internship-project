import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { Recepi } from '../recepi-interface/recepi-interface';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-admin-recepies',
  templateUrl: './admin-recepies.component.html',
  styleUrls: ['./admin-recepies.component.css']
})
export class AdminRecepiesComponent implements OnInit, OnDestroy {
  recepies: Recepi[] = this.storage.getAllResepies();
  userMail: string = this.storage.getCurrUserInfo().email;

  $subscription: Subscription = new Subscription();

  constructor(
    private storage: StorageService,
    private notifier: NotifierService
  ) { }

  deleteRecepi(recepi: Recepi) {
    if (this.storage.deleteRecepi(recepi)) {
      this.notifier.notify('success', 'Succesfully deleted');
    } else {
      this.notifier.notify('error', 'Error');
    }
  }

  likeUnlikeRecepi(author: string, label: string) {
    this.storage.likeUnlikeRecepi(author, label, this.storage.getCurrUserInfo().email);
  }

  ngOnInit() {
    this.$subscription.add(
      this.storage.users.subscribe(users => {
        this.recepies = [];
        users.forEach(user => {
          this.recepies = this.recepies.concat(user.recepies);
        });
      })
    );
  }

  ngOnDestroy() {
    this.$subscription.unsubscribe();
  }

  showRecepi(show: boolean, recepi: Recepi) {
    this.storage.viewRecepi(recepi.author, recepi.title, this.userMail)
    this.storage.showRecepi(show, recepi);
  }

  sortRecepi(event: HTMLParagraphElement) {
    let sorting: string | null = event.textContent;

    if (sorting?.split(' ')[1] === '(Highest)') {
      event.textContent = 'Sort (Lowest)';

      this.recepies = this.recepies.sort((recepi1, recepi2) => {
        return recepi1.views.length - recepi2.views.length
      });
    } else {
      event.textContent = 'Sort (Highest)';

      this.recepies = this.recepies.sort((recepi1, recepi2) => {
        return recepi2.views.length - recepi1.views.length
      });
    }
  }
}
