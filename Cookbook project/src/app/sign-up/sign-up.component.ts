import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  signUpForm = this.fb.group({
    email: ['', 
      [
        Validators.required,
        Validators.pattern(this.emailPattern)
      ]
    ],
    password: ['', 
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16)
      ]
    ],
    passwordConfrim: ['', 
      [
        Validators.required
      ]
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
    return this.signUpForm.get('email');
  }

  get _password() {
    return this.signUpForm.get('password');
  }

  get _passwordConfr() {
    return this.signUpForm.get('passwordConfrim');
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
      case 'showPassConfrErr':
        checkRes = this._passwordConfr?.invalid && (this._passwordConfr?.dirty || this._passwordConfr?.touched) || this._passwordConfr?.value !== this._password?.value;
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
      case 'passConfrReq':
        checkRes = this._passwordConfr?.errors?.required;
        break;
      case 'passConfrMatch':
        checkRes = this._passwordConfr?.value !== this._password?.value;
        break;
      case 'passMin':
        checkRes = this._password?.errors?.minlength;
        break;
      case 'passMax':
        checkRes = this._password?.errors?.maxlength;
        break;
      case 'buttonCheck':
        checkRes = !this._password?.valid || !this._email?.valid || !this._passwordConfr?.valid || this._passwordConfr?.value !== this._password?.value;
        break;
      default:
        console.log('No correct');
    }
    return checkRes;
  }

  onSubmit() {
    if(this.storage.onSignUp(this._email?.value, this._password?.value)) {
      alert('Welcome new user!');
      this.route.navigate(['/home']);
    }
    else {
      alert('Such user exists!');
    }
  }

}
