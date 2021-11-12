import { Component } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Recepi } from '../recepi-interface/recepi-interface';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-profile-recepies',
  templateUrl: './profile-recepies.component.html',
  styleUrls: ['./profile-recepies.component.css']
})
export class ProfileRecepiesComponent{
  recepies: Recepi[] = this.storage.getCurrUserRecepies();
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
}
