import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [StorageService]
})
export class SignInComponent implements OnInit {
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
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
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  get _email() {
    return this.signInForm.get('email');
  }

  get _password() {
    return this.signInForm.get('password');
  }

  onSubmit() {
    if(this.storage.onSignIn(this._email?.value, this._password?.value)) {
      alert('Welcome!');
      this.route.navigate(['/home']);
    }
    else {
      alert('Check login or password');
    }
  }

  checkValid(param: string) {
    let checkRes: boolean | undefined;
    switch (param) {
      case 'showEmailErr':
        checkRes = this._email?.invalid && (this._email?.dirty || this._email?.touched);
        break;
      case 'showPassErr':
        checkRes = this._password?.invalid && (this._password?.dirty || this._password?.touched);
        break;
      case 'emailReq':
        checkRes = this._email?.errors?.required;
        break;
      case 'emailPattern':
        checkRes = this._email?.errors?.pattern;
        break;
      case 'passReq':
        checkRes = this._password?.errors?.required;
        break;
      case 'buttonCheck':
        checkRes = !this._password?.valid || !this._email?.valid;
        break;
      default:
        console.log('No correct');
    }
    return checkRes;
  }
}
