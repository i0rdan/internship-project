import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ReactionState } from '../ngxs/state';
import { RemoveReaction, AddReaction } from '../ngxs/actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {

  reactions$: Observable<string>

  constructor(private store: Store) {
    this.reactions$ = this.store.select((state) => state.reactions.reactions);
  }

  addReaction(name: string) {
    this.store.dispatch(new AddReaction(name));
  }

  delReaction(name: string) {
    this.store.dispatch(new RemoveReaction(name));
  }
}
