import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { Subscription } from 'rxjs';
import { Cookbook } from '../cookbook-interface/cookbook-interface';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-all-cookbooks',
  templateUrl: './all-cookbooks.component.html',
  styleUrls: ['./all-cookbooks.component.css']
})
export class AllCookbooksComponent implements OnInit, OnDestroy {
  allBooks: Cookbook[] = this.storage.getAllCookbooks();
  currUserMail: string = this.storage.getCurrUserInfo().email;
  name: string = '';
  $subscription: Subscription = new Subscription();

  constructor(
    public storage: StorageService,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  likeUnlikeBook(author: string, label: string) {
    this.storage.likeUnlikeBook(author, label, this.currUserMail);
  }

  ngOnInit() {
    this.$subscription.add(
      this.storage.users.subscribe(users => {
        this.allBooks = [];
        users.forEach(user => {
          this.allBooks = this.allBooks.concat(user.cookbooks);
        });
        this.filter();
      })
    );
    this.$subscription.add(
      this.route.params.subscribe(params => {
        this.name = params['name'];
        this.paramsFilter(this.name);
      })
    );
  }

  paramsFilter(option: string) {
    const allBooks: Cookbook[] = this.storage.getAllCookbooks();
    let filterBooks: Cookbook[] = [];

    if (option.includes('#')) {
      option = option.split('#')[1];
      filterBooks = filterBooks.concat(allBooks.filter(book => {
        return book.label.includes(option.toLowerCase());
      }));
    } else {
      filterBooks = filterBooks.concat(allBooks.filter(book => {
        switch(option) {
          case 'vegeterian': 
            return book.type.toLowerCase() === 'vegeterian';
          case 'mexican': 
            return book.type.toLowerCase() === 'mexican';
          case 'greecekithcen': 
            return book.type.toLowerCase() === 'greece';
          case 'italypizza': 
            return book.type.toLowerCase() === 'italy pizza';
          case 'philippines': 
            return book.type.toLowerCase() === 'philippines';
          case 'japansushi': 
            return book.type.toLowerCase() === 'japan sushi';
          default: 
            return false;
        }
      }));
    }

    this.allBooks = filterBooks;

    if (option === 'all') {
      this.allBooks = this.storage.getAllCookbooks();
    }
  }

  filter() {
    const allBooks: Cookbook[] = this.storage.getAllCookbooks();
    let filterBooks: Cookbook[] = [];
    const hideBooks: any = document.getElementById('hideCookbooks');
    const vegeterian: any = document.getElementById('vegeterian');
    const mexican: any = document.getElementById('mexican');
    const greece: any = document.getElementById('greece');
    const sortBook: any = document.getElementById('sortBooks');

    if (vegeterian.checked) {
      filterBooks = filterBooks.concat(allBooks.filter(book => {
        return book.type.toLowerCase() === 'vegeterian';
      }));
    }

    if (mexican.checked) {
      filterBooks = filterBooks.concat(allBooks.filter(book => {
        return book.type.toLowerCase() === 'mexican';
      }));
    }

    if (greece.checked) {
      filterBooks = filterBooks.concat(allBooks.filter(book => {
        return book.type.toLowerCase() === 'greece';
      }));
    }

    if (hideBooks.checked) {
      if (filterBooks.length) {
        filterBooks = filterBooks.filter(book => {
          return book.author !== this.currUserMail;
        });
      } else {
        filterBooks = allBooks.filter(book => {
          return book.author !== this.currUserMail;
        });
      }
    }

    if (!vegeterian.checked && !mexican.checked && !greece.checked && !hideBooks.checked) {
      this.allBooks = this.sortBook(allBooks, sortBook.value);
    } else {
      this.allBooks = this.sortBook(filterBooks, sortBook.value);
    }
  }

  sortBook(books: Cookbook[], option: string): Cookbook[] {
    switch (option) {
      case 'popularity':
        return books.sort((book1, book2) => {
          return book2.views.length - book1.views.length;
        });
      case 'likes':
        return books.sort((book1, book2) => {
          return book2.likes.length - book1.likes.length;
        });
      case 'comments':
        return books.sort((book1, book2) => {
          return book2.comments - book1.comments;
        });
      default:
        return books;
    } 
  }

  ngOnDestroy() {
    this.$subscription.unsubscribe();
  }

  clearFilter() {
    window.location.reload();
  }

  showCookbook(show: boolean, cookbook: Cookbook) {
    this.storage.viewCookbook(cookbook.author, cookbook.label, this.currUserMail)
    this.storage.showCookbook(show, cookbook);
  }
}
