import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [StorageService]
})
export class HeaderComponent implements OnInit{
  userName!: string;
  constructor(public storage:StorageService) { }

  ngOnInit() {
    this.storage.currUser.subscribe(user => {
      this.userName = user.username;
    });
  }
}
