import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
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

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get passwordConfr() {
    return this.signUpForm.get('passwordConfrim');
  }

  checkValid(param: string): boolean | undefined {
    switch (param) {
      case 'showEmailErr':
        return this.email?.invalid && (this.email?.dirty || this.email?.touched);
      case 'showPassErr':
        return this.password?.invalid && (this.password?.dirty || this.password?.touched);
      case 'showPassConfrErr':
        return this.passwordConfr?.invalid && (this.passwordConfr?.dirty || this.passwordConfr?.touched) || this.passwordConfr?.value !== this.password?.value;
      case 'emailReq':
        return this.email?.errors?.required;
      case 'emailPattern':
        return this.email?.errors?.pattern;
      case 'passReq':
        return this.password?.errors?.required;
      case 'passConfrReq':
        return this.passwordConfr?.errors?.required;
      case 'passConfrMatch':
        return this.passwordConfr?.value !== this.password?.value;
      case 'passMin':
        return this.password?.errors?.minlength;
      case 'passMax':
        return this.password?.errors?.maxlength;
      case 'buttonCheck':
        return !this.password?.valid || !this.email?.valid || !this.passwordConfr?.valid || this.passwordConfr?.value !== this.password?.value;
      default:
        return undefined;
    }
  }

  onSubmit() {
    if(this.storage.onSignUp(this.email?.value, this.password?.value)) {
      alert('Welcome new user!');
      this.route.navigate(['/home']);
    } else {
      alert('Such user exists!');
    }
  }

}
