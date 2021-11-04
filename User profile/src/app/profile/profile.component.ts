import { Component } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userName = this.storage.getCurrUserInfo()[0][2];
  userEmail = this.storage.getCurrUserInfo()[0][0];
  userPassword = this.storage.getCurrUserInfo()[0][1];
  userPhoto: string = this.storage.getCurrUserInfo()[0][3];
  constructor(private storage:StorageService) { }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.userPhoto = String(event.target?.result);
        this.storage.saveCurrUserChanges(this.userEmail, [this.userEmail, this.userPassword, this.userName, this.userPhoto]);
      }
    }
  }
}
