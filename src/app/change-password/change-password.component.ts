import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  
  changePasswordForm = this.fb.group({
    email: ['', 
      [
        Validators.required,
        Validators.pattern(this.emailPattern)
      ]
    ],
    password: ['', 
      Validators.required
    ]
  });

  constructor(
    private fb: FormBuilder, 
    private storage: StorageService, 
    private route: Router,
    private notifier: NotifierService
  ) { }

  get email() {
    return this.changePasswordForm.get('email');
  }

  get password() {
    return this.changePasswordForm.get('password');
  }

  onSubmit() {
    if (this.storage.changePassword(this.email?.value, this.password?.value)) {
      this.route.navigate(['/sign-in']);
    } else {
      this.notifier.notify('error', 'Check provided email!');
    }
  }

  checkValid(param: string): boolean | undefined {
    switch (param) {
      case 'showEmailErr':
        return this.email?.invalid && (this.email?.dirty || this.email?.touched);
      case 'showPassErr':
        return this.password?.invalid && (this.password?.dirty || this.password?.touched);
      case 'emailReq':
        return this.email?.errors?.required;
      case 'emailPattern':
        return this.email?.errors?.pattern;
      case 'passReq':
        return this.password?.errors?.required;
      case 'buttonCheck':
        return !this.password?.valid || !this.email?.valid;
      default:
        return undefined;
    }
  }
}
