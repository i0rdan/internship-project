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
  cookbookPhoto: string = '';
  cookbookCreationForm = this.fb.group({
    cookbookLabel: ['', 
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]
    ],
    cookbookDescription: ['']
  });

  constructor(
    private fb: FormBuilder, 
    public storage: StorageService,
    private notifier: NotifierService
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
        this.cookbookPhoto = String(event.target?.result);
      }
    }
  }

  onSubmit(event: any): void {
    if (!event.target.classList.contains('update')) {
      if (this.storage.addCookbook(this.cookbookLabel?.value, this.cookbookDescription?.value, this.cookbookPhoto)) {
        this.notifier.notify('success', 'Succesfully');
      } else {
        this.notifier.notify('error', 'You has cookbook with such label');
      }
    } else {
      if (this.storage.updateCookbook(this.cookbookLabel?.value, this.cookbookDescription?.value, this.cookbookPhoto)) {
        this.notifier.notify('success', 'Succesfully');
      } else {
        this.notifier.notify('error', 'You has cookbook with such label');
      }
    }
    event.target.classList.remove('update');
    this.cookbookPhoto = '';
  }
}
