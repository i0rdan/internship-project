import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { Recepi } from '../recepi-interface/recepi-interface';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-cookbook-update',
  templateUrl: './cookbook-update.component.html',
  styleUrls: ['./cookbook-update.component.css']
})
export class CookbookUpdateComponent implements OnInit, OnDestroy {
  recepiNames: string[] = [];
  addRecepiToBook: Recepi[] = [];
  addRecepiNamesToBook: string[] = [];
  cookbookPhoto: string = '';
  show3Symbols: boolean = false;

  $subscription: Subscription = new Subscription();

  cookbookUpdateForm = this.fb.group({
    cookbookLabel: ['', 
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]
    ],
    cookbookDescription: [''],
    cookbookType: ['']
  });

  constructor(
    private fb: FormBuilder, 
    public storage: StorageService,
    private notifier: NotifierService
  ) { }

  ngOnInit() {
    this.$subscription.add(
      this.storage.cookbookUpdate.subscribe(book => {
        this.cookbookUpdateForm = this.fb.group({
          cookbookLabel: [book.label, 
            [
              Validators.required,
              Validators.minLength(4),
              Validators.maxLength(20)
            ]
          ],
          cookbookDescription: book.description,
          cookbookType: book.type
        });
        this.cookbookPhoto = book.photo;
        this.addRecepiNamesToBook = book.recepiNames;
        this.addRecepiNamesToBook.forEach(elem => {
          this.addRecepiToBook.push(this.storage.getRecepiByTitle(elem));
        });
      })
    );
  }

  ngOnDestroy() {
    this.$subscription.unsubscribe();
  }

  get cookbookLabel() {
    return this.cookbookUpdateForm.get('cookbookLabel');
  }

  get cookbookDescription() {
    return this.cookbookUpdateForm.get('cookbookDescription');
  }

  get cookbookType() {
    return this.cookbookUpdateForm.get('cookbookType');
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
    this.storage.updateBookShow(false);
    this.cookbookUpdateForm.reset();
    this.recepiNames = [];
    this.addRecepiToBook = [];
    this.addRecepiNamesToBook = [];
    this.show3Symbols = false;
    this.cookbookPhoto = '';
  }

  showAddedRecepiesInForm(recepiName: string) {
    this.recepiNames = []; 
    this.addRecepiToBook.push(this.storage.getRecepiByTitle(recepiName));
    this.addRecepiNamesToBook.push(recepiName);
  }

  deleteAddedRecepiesInForm(index: number) {
    this.addRecepiToBook.splice(index, 1);
    this.recepiNames = [];
    this.addRecepiNamesToBook.splice(index, 1);
  }

  onSubmit(event: any): void {
    if (this.storage.updateCookbook(this.cookbookLabel?.value, this.cookbookDescription?.value, this.cookbookPhoto, this.addRecepiNamesToBook, this.cookbookType?.value)) {
      this.notifier.notify('success', 'Successfully updated');
    } else {
      this.notifier.notify('error', 'You has cookbook with such label');
    }
    
    this.closeForm();
  }
}
