import { Component } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { User } from '../user-interface/user-interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  currUser: User = this.storage.getCurrUserInfo();
  constructor(private storage:StorageService) { }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.currUser.photo = String(event.target?.result);
        this.storage.saveCurrUserChanges(this.currUser.email, this.currUser);
      }
    }
  }
}
