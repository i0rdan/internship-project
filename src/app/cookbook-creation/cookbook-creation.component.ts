import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Cookbook } from '../cookbook-interface/cookbook-interface';
import { Recepi } from '../recepi-interface/recepi-interface';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-cookbook-creation',
  templateUrl: './cookbook-creation.component.html',
  styleUrls: ['./cookbook-creation.component.css'],
  providers: [StorageService]
})
export class CookbookCreationComponent {
  recepiNames: string[] = [];
  addRecepiToBook: Recepi[] = [];
  addRecepiNamesToBook: string[] = [];
  cookbookPhoto: string = '';
  show3Symbols: boolean = false;
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

  showFoundedRecepies(event: any) {
    if (event.target.value.length >= 3) {
      this.recepiNames = this.storage.getCurrUserRecepiesNames(event.target.value).filter((elem) => {
        return !this.addRecepiNamesToBook.includes(elem);
      });
      this.show3Symbols = false;
    } else {
      this.show3Symbols = true;
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

  closeForm() {
    const createCookbookForm: any = document.getElementById('createCookbookForm');
    const creationCookbookButton: any = document.getElementById('creationCookbookButton');

    this.storage.creationShow(false);

    creationCookbookButton.classList.remove('update');
    createCookbookForm.reset();

    this.recepiNames = [];
    this.addRecepiToBook = [];
    this.addRecepiNamesToBook = [];
    this.show3Symbols = false;
    this.cookbookPhoto = '';
  }

  showAddedRecepiesInForm(recepiName: string) {
    this.recepiNames = []; 
    this.addRecepiToBook.push(this.storage.getRecepiByTitle(recepiName));
    this.addRecepiNamesToBook.push(recepiName)
  }

  deleteAddedRecepiesInForm(index: number) {
    this.addRecepiToBook.splice(index, 1);
    this.recepiNames = [];
    this.addRecepiNamesToBook.splice(index, 1)
  }

  onSubmit(event: any): void {
    if (!event.target.classList.contains('update')) {
      if (this.storage.addCookbook(this.cookbookLabel?.value, this.cookbookDescription?.value, this.cookbookPhoto, this.addRecepiNamesToBook)) {
        window.location.reload();
      } else {
        this.notifier.notify('error', 'You has cookbook with such label');
      }
    } else {
      if (this.storage.updateCookbook(this.cookbookLabel?.value, this.cookbookDescription?.value, this.cookbookPhoto)) {
        window.location.reload();
      } else {
        this.notifier.notify('error', 'You has cookbook with such label');
      }
    }
    
    this.closeForm();
  }
}
