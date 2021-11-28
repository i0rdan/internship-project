import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { Comment } from '../comment-interface/comment-interface';
import { Cookbook } from '../cookbook-interface/cookbook-interface';
import { Recepi } from '../recepi-interface/recepi-interface';
import { StorageService } from '../storage/storage.service';
import { User } from '../user-interface/user-interface';

@Component({
  selector: 'app-cookbook-view',
  templateUrl: './cookbook-view.component.html',
  styleUrls: ['./cookbook-view.component.css']
})
export class CookbookViewComponent implements OnInit, OnDestroy {
  cookbook!: Cookbook;
  recepiInBook: Recepi[] = [];
  currUser: User = this.storage.getCurrUserInfo();
  currUserMail: string = this.currUser.email;

  $subscription: Subscription = new Subscription();

  constructor(
    private storage: StorageService,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void {
    this.$subscription.add(
      this.storage.cookbookView.subscribe(cookbook => {
        this.cookbook = cookbook;

        cookbook.recepiNames.forEach(rec => {
          this.recepiInBook.push(this.storage.getRecepiByTitle(rec, cookbook.author));
        });
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

  cloneBookToCurrUser(cookbook: Cookbook) {
    if (this.storage.cloneBook(cookbook)) {
      this.closeForm();

      this.notifier.notify('success', 'Successfully cloned');
    } else {
      this.notifier.notify('error', 'Smth went wrong');
    }
  }

  cloneRecepiToCurrUser(recepi: Recepi) {
    if (this.storage.addRecepi(recepi.title, recepi.description, recepi.photo, recepi.directions, recepi.ingridiens, recepi.time)) {
      this.closeForm();

      this.notifier.notify('success', 'Successfully cloned');
    } else {
      this.notifier.notify('error', 'Smth went wrong');
    }
  }

  addComment(commentInput: HTMLInputElement) {
    const comment: Comment = {
      text: commentInput.value, 
      time: new Date(), 
      authorPhoto: this.currUser.photo, 
      authorUsername: this.currUser.email
    }

    if (commentInput.value) {
      this.recepiInBook = [];
      this.storage.addCommentForCookbook(comment, this.cookbook);
      
      commentInput.value = '';
    }
  }

  deleteComment(comment: Comment) {
    this.recepiInBook = [];
    this.storage.deleteCommentForCookbook(comment, this.cookbook);
  }

  updateComment(comment: Comment, commentInput: HTMLInputElement) {
    commentInput.value = comment.text;
    
    this.recepiInBook = [];
    this.storage.deleteCommentForCookbook(comment, this.cookbook);
  }
}
