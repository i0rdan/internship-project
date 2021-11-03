import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [StorageService]
})
export class HeaderComponent {
  userName = this.storage.getCurrUserInfo()[0][2];
  constructor(private storage:StorageService) { }
}
