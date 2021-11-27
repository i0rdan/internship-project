import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Comment } from '../comment-interface/comment-interface';
import { Recepi } from '../recepi-interface/recepi-interface';
import { StorageService } from '../storage/storage.service';
import { User } from '../user-interface/user-interface';

@Component({
  selector: 'app-recepi-view',
  templateUrl: './recepi-view.component.html',
  styleUrls: ['./recepi-view.component.css']
})
export class RecepiViewComponent implements OnInit, OnDestroy {
  recepi!: Recepi;
  currUser: User = this.storage.getCurrUserInfo();

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

  addComment(commentInput: HTMLInputElement) {
    const comment: Comment = {
      text: commentInput.value, 
      time: new Date(), 
      authorPhoto: this.currUser.photo, 
      authorUsername: this.currUser.email
    }

    if (commentInput.value) {
      this.storage.addCommentForRecepi(comment, this.recepi);
      commentInput.value = '';
    }
  }

  deleteComment(comment: Comment) {
    this.storage.deleteCommentForRecepi(comment, this.recepi);
  }

  updateComment(comment: Comment, commentInput: HTMLInputElement) {
    commentInput.value = comment.text;
    
    this.storage.deleteCommentForRecepi(comment, this.recepi);
  }
}
