import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-recepi-creation',
  templateUrl: './recepi-creation.component.html',
  styleUrls: ['./recepi-creation.component.css']
})
export class RecepiCreationComponent implements OnInit{
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
    recepiDirections: ['']
  });

  ngOnInit () {
    let ingridientsButton: any = document.getElementById('enterEnter')
    ingridientsButton?.addEventListener('keydown', (e: { keyCode: number; }) => {
      if (e.keyCode === 16 && ingridientsButton.value) {
        this.recepiIngridients.push(ingridientsButton.value)
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
    let form: any = document.getElementById('createRecepiForm');
    let recepiConf: any = document.getElementById('creationRecepiButton');
    this.storage.creationShowRecepie(false);
    recepiConf.classList.remove('update');
    form.reset();
    this.recepiIngridients = []
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
    if (!event.target.classList.contains('update')) {
      if (this.storage.addRecepi(this.recepiLabel?.value, this.recepiDescription?.value, this.recepiPhoto, this.recepiDirections?.value, this.recepiIngridients)) {
        this.notifier.notify('success', 'Succesfully');
      } else {
        this.notifier.notify('error', 'You has cookbook with such label');
      }
    } else {
      if (this.storage.updateRecepi(this.recepiLabel?.value, this.recepiDescription?.value, this.recepiPhoto, this.recepiDirections?.value, this.recepiIngridients)) {
        this.notifier.notify('success', 'Succesfully');
      } else {
        this.notifier.notify('error', 'You has cookbook with such label');
      }
    }
    this.closeForm();
    this.recepiPhoto = '';
  }
}
