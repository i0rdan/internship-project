import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-recepi-update',
  templateUrl: './recepi-update.component.html',
  styleUrls: ['./recepi-update.component.css']
})
export class RecepiUpdateComponent implements OnInit, OnDestroy {
  $subscription: Subscription = new Subscription();
  recepiPhoto: string = '';
  recepiIngridients: string[] = [];
  recepiUpdateForm = this.fb.group({
    recepiLabel: ['', 
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]
    ],
    recepiDescription: [''],
    recepiDirections: [''],
    recepiTime: ['']
  });

  ngOnInit () {
    const ingridientsButton: any = document.getElementById('enterIngridients');

    ingridientsButton?.addEventListener('keydown', (e: { keyCode: number; }) => {
      if (e.keyCode === 16 && ingridientsButton.value) {
        this.recepiIngridients.push(ingridientsButton.value);
        ingridientsButton.value = '';
      }
    });

    this.$subscription.add(
      this.storage.recepiUpdate.subscribe(recepi => {
        this.recepiPhoto = recepi.photo;
        this.recepiIngridients = recepi.ingridiens;
        this.recepiUpdateForm = this.fb.group({
          recepiLabel: [recepi.title, 
            [
              Validators.required,
              Validators.minLength(4),
              Validators.maxLength(20)
            ]
          ],
          recepiDescription: [recepi.description],
          recepiDirections: [recepi.directions],
          recepiTime: [recepi.time]
        });
      })
    );
  }

  ngOnDestroy() {
    this.$subscription.unsubscribe();
  }

  constructor(
    private fb: FormBuilder, 
    public storage: StorageService,
    private notifier: NotifierService
  ) { }

  get recepiLabel() {
    return this.recepiUpdateForm.get('recepiLabel');
  }

  get recepiDescription() {
    return this.recepiUpdateForm.get('recepiDescription');
  }

  get recepiDirections() {
    return this.recepiUpdateForm.get('recepiDirections');
  }

  get recepiTime() {
    return this.recepiUpdateForm.get('recepiTime');
  }
  checkValid(param: string): boolean | undefined {
    switch (param) {
      case 'showLabelErr':
        return this.recepiLabel?.invalid && (this.recepiLabel?.dirty || this.recepiLabel?.touched);
      case 'labelReq':
        return this.recepiLabel?.errors?.required;
      case 'labelMin':
        return this.recepiLabel?.errors?.minlength;
      case 'labelMax':
        return this.recepiLabel?.errors?.maxlength;
      case 'buttonCheck':
        return !this.recepiLabel?.valid;
      default:
        return undefined;
    }
  }

  closeForm() {
    this.storage.updateRecepiShow(false);
    this.recepiUpdateForm.reset();
    this.recepiIngridients = [];
    this.recepiPhoto = '';
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.recepiPhoto = String(event.target?.result);
      }
    }
  }

  onSubmit(event: any): void {
    if (this.storage.updateRecepi(this.recepiLabel?.value, this.recepiDescription?.value, this.recepiPhoto, this.recepiDirections?.value, this.recepiIngridients, this.recepiTime?.value)) {
      this.notifier.notify('success', 'Successfully updatet');
    } else {
      this.notifier.notify('error', 'You has recepi with such label');
    }
    
    this.closeForm();
  }
}
