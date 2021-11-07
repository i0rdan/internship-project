import { Component } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-cookbook-creation',
  templateUrl: './cookbook-creation.component.html',
  styleUrls: ['./cookbook-creation.component.css'],
  providers: [StorageService]
})
export class CookbookCreationComponent{
  constructor(public storage: StorageService) { }
}
