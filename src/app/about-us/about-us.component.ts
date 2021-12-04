import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ReactionState } from '../ngxs/state';
import { RemoveReaction, AddReaction } from '../ngxs/actions';
import { Observable } from 'rxjs';
import { HttpcliService } from '../http/httpcli.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
  providers: [HttpcliService]
})
export class AboutUsComponent implements OnInit{
  photo!: string;
  description!: string;
  authname!: string;

  reactions$: Observable<string>;

  constructor(
    private store: Store,
    public httpService: HttpcliService
  ) {
    this.reactions$ = this.store.select((state) => state.reactions.reactions);
  }

  addReaction(name: string) {
    this.store.dispatch(new AddReaction(name));
  }

  delReaction(name: string) {
    this.store.dispatch(new RemoveReaction(name));
  }
      
  ngOnInit(){  
    this.httpService.getData().subscribe((data: any) => {
      this.description = data.description;
      this.photo = data.photo;
      this.authname = data.authname;
    });
  }
}
