import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recepi } from '../recepi-interface/recepi-interface';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-recepi-view',
  templateUrl: './recepi-view.component.html',
  styleUrls: ['./recepi-view.component.css']
})
export class RecepiViewComponent implements OnInit, OnDestroy {
  recepi!: Recepi;

  $subscription: Subscription = new Subscription();

  constructor(private storage: StorageService) { }

  ngOnInit(): void {
    this.$subscription.add(
      this.storage.recepiView.subscribe(recepi => {
        this.recepi = recepi;
      })
    );
  }

  closeForm() {
    this.storage.showRecepi(false);
  }

  ngOnDestroy() {
    this.$subscription.unsubscribe();
  }

}
