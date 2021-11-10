import { Component } from '@angular/core';
import { Cookbook } from '../cookbook-interface/cookbook-interface';
import { StorageService } from '../storage/storage.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-profile-cookbooks',
  templateUrl: './profile-cookbooks.component.html',
  styleUrls: ['./profile-cookbooks.component.css']
})
export class ProfileCookbooksComponent {
  cookbooks: Cookbook[] = this.storage.getCurrUserCookbooks();
  constructor(
    private storage: StorageService,
    private notifier: NotifierService,
  ) { }

  deleteCookbook(cookbook: Cookbook) {
    if (this.storage.deleteCookbook(cookbook)) {
      this.notifier.notify('success', 'Succesfully deleted');
    } else {
      this.notifier.notify('error', 'Error');
    }
  }

  updateCookbook(cookbook: Cookbook) {
    this.storage.creationShow(true, cookbook);
  }
}
