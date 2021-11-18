import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { Recepi } from '../recepi-interface/recepi-interface';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-profile-recepies',
  templateUrl: './profile-recepies.component.html',
  styleUrls: ['./profile-recepies.component.css']
})
export class ProfileRecepiesComponent implements OnDestroy, OnInit{
  recepies: Recepi[] = this.storage.getCurrUserInfo().recepies;

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

  updateRecepi(recepi: Recepi) {
    this.storage.creationShowRecepie(true, recepi);
  }

  likeUnlikeRecepi(author: string, label: string) {
    this.storage.likeUnlikeRecepi(author, label, this.storage.getCurrUserInfo().email);
  }

  ngOnInit() {
    this.$subscription.add(
      this.storage.currUser.subscribe(user => {
        this.recepies = user.recepies;
      })
    );
  }

  ngOnDestroy() {
    this.$subscription.unsubscribe();
  }
}
