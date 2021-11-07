import { Component } from '@angular/core';
import { Cookbook } from '../cookbook-interface/cookbook-interface';
import { StorageService } from '../storage/storage.service';
import { CookbookCreationComponent } from '../cookbook-creation/cookbook-creation.component';

@Component({
  selector: 'app-profile-cookbooks',
  templateUrl: './profile-cookbooks.component.html',
  styleUrls: ['./profile-cookbooks.component.css']
})
export class ProfileCookbooksComponent {
  cookbooks: Cookbook[] = this.storage.getCurrUserCookbooks();
  constructor(private storage: StorageService) { }
}
