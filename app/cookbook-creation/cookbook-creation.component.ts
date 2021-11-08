import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Cookbook } from '../cookbook-interface/cookbook-interface';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-cookbook-creation',
  templateUrl: './cookbook-creation.component.html',
  styleUrls: ['./cookbook-creation.component.css'],
  providers: [StorageService]
})
export class CookbookCreationComponent {
  newCookbook: Cookbook = {
    label: '',
    author: this.storage.getCurrUserLogin(),
    description: '',
    photo: '',
    likes: 0,
    comments: 0,
    views: 0
  }

  cookbookCreationForm = this.fb.group({
    cookbookLabel: ['', 
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]
    ],
    cookbookDescription: [''],
    cookbookPhoto: ['']
  });

  constructor(
    private fb: FormBuilder, 
    public storage: StorageService,
    private notifier: NotifierService,
    private route: Router
  ) { }

  get cookbookLabel() {
    return this.cookbookCreationForm.get('cookbookLabel');
  }

  get cookbookDescription() {
    return this.cookbookCreationForm.get('cookbookDescription');
  }

  checkValid(param: string): boolean | undefined {
    switch (param) {
      case 'showLabelErr':
        return this.cookbookLabel?.invalid && (this.cookbookLabel?.dirty || this.cookbookLabel?.touched);
      case 'labelReq':
        return this.cookbookLabel?.errors?.required;
      case 'labelMin':
        return this.cookbookLabel?.errors?.minlength;
      case 'labelMax':
        return this.cookbookLabel?.errors?.maxlength;
      case 'buttonCheck':
        return !this.cookbookLabel?.valid;
      default:
        return undefined;
    }
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.newCookbook.photo = String(event.target?.result);
      }
    }
  }

  onSubmit(): void {
    let form: any = document.getElementById('createCookbookForm');
    this.newCookbook.label = this.cookbookLabel?.value;
    this.newCookbook.description = this.cookbookDescription?.value;
    if (this.storage.addCookbook(this.newCookbook)) {
      this.notifier.notify('success', 'Succesfully added');
    } else {
      this.notifier.notify('error', 'You has such cookbook!');
    }
    form.reset();
    this.newCookbook = {
      label: '',
      author: this.storage.getCurrUserLogin(),
      description: '',
      photo: '',
      likes: 0,
      comments: 0,
      views: 0
    }
  }
}
