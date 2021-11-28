import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-recepi-creation',
  templateUrl: './recepi-creation.component.html',
  styleUrls: ['./recepi-creation.component.css']
})
export class RecepiCreationComponent implements OnInit {
  recepiPhoto: string = '';
  recepiIngridients: string[] = [];

  recepiCreationForm = this.fb.group({
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

  ngOnInit() {
    const ingridientsButton: any = document.getElementById('enterEnter');

    ingridientsButton?.addEventListener('keydown', (e: { keyCode: number; }) => {
      if (e.keyCode === 16 && ingridientsButton.value) {
        this.recepiIngridients.push(ingridientsButton.value);
        ingridientsButton.value = '';
      }
    });
  }

  constructor(
    private fb: FormBuilder, 
    public storage: StorageService,
    private notifier: NotifierService
  ) { }

  get recepiLabel() {
    return this.recepiCreationForm.get('recepiLabel');
  }

  get recepiDescription() {
    return this.recepiCreationForm.get('recepiDescription');
  }

  get recepiDirections() {
    return this.recepiCreationForm.get('recepiDirections');
  }

  get recepiTime() {
    return this.recepiCreationForm.get('recepiTime');
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
    this.storage.creationShowRecepie(false);
    this.recepiCreationForm.reset();
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
    if (this.storage.addRecepi(this.recepiLabel?.value, this.recepiDescription?.value, this.recepiPhoto, this.recepiDirections?.value, this.recepiIngridients, this.recepiTime?.value)) {
      window.location.reload();
    } else {
      this.notifier.notify('error', 'You has recepi with such label');
    }
    
    this.closeForm();
  }
}
