import { Component, OnDestroy, OnInit } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  login: string = this.storage.getCurrUserLogin();

  constructor(private storage: StorageService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.storage.clearCurrUser();
  }

}
