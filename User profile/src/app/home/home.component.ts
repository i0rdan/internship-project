import { Component, OnDestroy, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnDestroy {
  login: string = this.storage.getCurrUserLogin();

  constructor(private storage: StorageService) { }

  ngOnDestroy(): void {
    this.storage.clearCurrUser();
  }

}
