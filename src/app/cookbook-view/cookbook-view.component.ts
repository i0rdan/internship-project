import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cookbook } from '../cookbook-interface/cookbook-interface';
import { Recepi } from '../recepi-interface/recepi-interface';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-cookbook-view',
  templateUrl: './cookbook-view.component.html',
  styleUrls: ['./cookbook-view.component.css']
})
export class CookbookViewComponent implements OnInit, OnDestroy {
  cookbook!: Cookbook;
  recepiInBook: Recepi[] = [];

  $subscription: Subscription = new Subscription();

  constructor(private storage: StorageService) { }

  ngOnInit(): void {
    this.$subscription.add(
      this.storage.cookbookView.subscribe(cookbook => {
        this.cookbook = cookbook;
        cookbook.recepiNames.forEach(rec => {
          this.recepiInBook.push(this.storage.getRecepiByTitle(rec, cookbook.author));
        })
        console.log(this.recepiInBook)
      })
    );
  }

  closeForm() {
    this.recepiInBook = [];
    this.storage.showCookbook(false);
  }

  ngOnDestroy() {
    this.$subscription.unsubscribe();
  }

}
