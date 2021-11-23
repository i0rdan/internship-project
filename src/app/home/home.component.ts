import { Component} from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { Recepi } from '../recepi-interface/recepi-interface';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  allRecepies: Recepi[] = this.storage.getAllResepies();
  commentedRecepies: Recepi[] = this.allRecepies.sort((rec1, rec2) => {
    return rec2.comments - rec1.comments;
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

  constructor(private storage: StorageService) { }
}
