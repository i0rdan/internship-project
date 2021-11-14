import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [StorageService]
})
export class SignInComponent {
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  signInForm = this.fb.group({
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
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }

  onSubmit() {
    if (this.storage.onSignIn(this.email?.value, this.password?.value)) {
      this.route.navigate(['/home']);
    } else {
      this.notifier.notify('error', 'Check login or password!');
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
