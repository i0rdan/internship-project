import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { TutorialState } from '../ngxs/state';
import { RemoveTutorial, AddTutorial } from '../ngxs/actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  tutorials$: Observable<string>

  constructor(private store: Store) {
    this.tutorials$ = this.store.select(state => state.tutorials.tutorials);
  }

  addTutorial(name: string) {
    this.store.dispatch(new AddTutorial(name))
  }

  delTutorial(name: string) {
    this.store.dispatch(new RemoveTutorial(name));
  }

  ngOnInit() {}

}
