import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { Subscription } from 'rxjs';
import { Recepi } from '../recepi-interface/recepi-interface';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-all-recepies',
  templateUrl: './all-recepies.component.html',
  styleUrls: ['./all-recepies.component.css']
})
export class AllRecepiesComponent implements OnInit {
  allRecepi: Recepi[] = this.storage.getAllResepies();
  currUserMail: string = this.storage.getCurrUserInfo().email;
  name: string = ''
  $subscription: Subscription = new Subscription();

  constructor(
    private storage: StorageService,
    private router: ActivatedRoute
  ) { }

  likeUnlikeRecepi(author: string, label: string) {
    this.storage.likeUnlikeRecepi(author, label, this.storage.getCurrUserInfo().email);
  }

  ngOnInit() {
    this.$subscription.add(
      this.storage.users.subscribe(users => {
        this.allRecepi = [];
        users.forEach(user => {
          this.allRecepi = this.allRecepi.concat(user.recepies);
        });
        this.filter();
      })
    );
    this.router.params.subscribe(params => {
      this.name = params['name'];
    });
    // this.filter();
    // switch (this.name) {
    //   case 'popularity':
    //     return this.sortRecepi(this.allRecepi, 'popularity')
    //   case 'likes':
    //     return this.sortRecepi(this.allRecepi, 'likes')
    //   case 'comments':
    //     return this.sortRecepi(this.allRecepi, 'comments')
    //   default:
    // }
  }

  filter() {
    const allRecepi: Recepi[] = this.storage.getAllResepies();
    const lower: any = document.getElementById('lower');
    const upper: any = document.getElementById('upper');
    const sortRecepi: any = document.getElementById('sortRecepies');
    let filterRecepies: Recepi[] = [];

    if (lower.value <= upper.value) {
      filterRecepies = allRecepi.filter(recepi => {
        return recepi.time >= lower.value && recepi.time <= upper.value;
      });
    } else {
      filterRecepies = allRecepi.filter(recepi => {
        return recepi.time <= lower.value && recepi.time >= upper.value;
      });
    }

    this.allRecepi = this.sortRecepi(filterRecepies, sortRecepi.value);
  }

  sortRecepi(recepies: Recepi[], option: string): Recepi[] {
    switch (option) {
      case 'popularity':
        return recepies.sort((rec1, rec2) => {
          return rec2.views.length - rec1.views.length;
        });
      case 'likes':
        return recepies.sort((rec1, rec2) => {
          return rec2.likes.length - rec1.likes.length;
        });
      case 'comments':
        return recepies.sort((rec1, rec2) => {
          return rec2.comments - rec1.comments;
        });
      default:
        return recepies;
    } 
  }

  ngOnDestroy() {
    this.$subscription.unsubscribe();
  }

  clearFilter() {
    window.location.reload();
  }

  showRecepi(show: boolean, recepi: Recepi) {
    this.storage.viewRecepi(recepi.author, recepi.title, this.currUserMail)
    this.storage.showRecepi(show, recepi);
  }
}
