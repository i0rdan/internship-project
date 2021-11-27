import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recepi } from '../recepi-interface/recepi-interface';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
  allRecepies: Recepi[] = this.storage.getAllResepies();
  currUserMail: string = this.storage.getCurrUserInfo().email;
  $subscription: Subscription = new Subscription();
  
  commentedRecepies: Recepi[] = this.allRecepies.sort((rec1, rec2) => {
    return rec2.comments.length - rec1.comments.length;
  })
  .slice(0, 3);

  likedRecepies: Recepi[] = this.allRecepies.sort((rec1, rec2) => {
    return rec2.likes.length - rec1.likes.length;
  })
  .slice(0, 3);

  viewedRecepies: Recepi[] = this.allRecepies.sort((rec1, rec2) => {
    return rec2.views.length - rec1.views.length;
  })
  .slice(0, 3);

  constructor(
    private storage: StorageService,
    private route: Router) { }

  ngOnInit() {
    this.$subscription.add(
      this.storage.users.subscribe(users => {
        this.allRecepies = [];

        users.forEach(user => {
          this.allRecepies = this.allRecepies.concat(user.recepies);
        });

        this.commentedRecepies = this.allRecepies.sort((rec1, rec2) => {
          return rec2.comments.length - rec1.comments.length;
        })
        .slice(0, 3);

        this.likedRecepies = this.allRecepies.sort((rec1, rec2) => {
          return rec2.likes.length - rec1.likes.length;
        })
        .slice(0, 3);

        this.viewedRecepies = this.allRecepies.sort((rec1, rec2) => {
          return rec2.views.length - rec1.views.length;
        })
        .slice(0, 3);
      })
    );
  }

  showRecepi(show: boolean, recepi: Recepi) {
    this.storage.viewRecepi(recepi.author, recepi.title, this.currUserMail)
    this.storage.showRecepi(show, recepi);
  }

  likeUnlikeRecepi(author: string, label: string) {
    this.storage.likeUnlikeRecepi(author, label, this.storage.getCurrUserInfo().email);
  }

  searchBooks(event: any) {
    this.route.navigate([`cookbooks/#${event.value}`])
  }
}
