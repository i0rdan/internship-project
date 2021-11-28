import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { User } from '../user-interface/user-interface';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit, OnDestroy{
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  users: User[] = this.storage.getAllUsersInfo();
  currUserMail: string = this.storage.getCurrUserInfo().email;

  $subscription: Subscription = new Subscription();

  createUserForm = this.fb.group({
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
    ]
  });

  constructor(
    private fb: FormBuilder, 
    private storage: StorageService,
    private notifier: NotifierService
  ) { }

  ngOnInit() {
    this.$subscription.add(
      this.storage.users.subscribe(users => {
        this.users = users;
      })
    );
  }

  ngOnDestroy() {
    this.$subscription.unsubscribe();
  }

  get email() {
    return this.createUserForm.get('email');
  }

  get password() {
    return this.createUserForm.get('password');
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
      case 'passMin':
        return this.password?.errors?.minlength;
      case 'passMax':
        return this.password?.errors?.maxlength;
      case 'buttonCheck':
        return !this.password?.valid || !this.email?.valid;
      default:
        return undefined;
    }
  }

  onSubmit() {
    if(this.storage.addUser(this.email?.value, this.password?.value)) {
      this.notifier.notify('success', 'Successfully created');
    } else {
      this.notifier.notify('error', 'Such email exists');
    }
  }

  setStatus(selectElem: HTMLSelectElement, user: User) {
    this.storage.changeUserStatus(selectElem.value, user);
  }

  sortUsers(event: HTMLParagraphElement) {
    let sorting: string | null = event.textContent;

    if (sorting?.split(' ')[1] === '(Highest)') {
      event.textContent = 'Sort (Lowest)';

      this.users = this.users.sort((user1, user2) => {
        return (user1.recepies.length + user1.cookbooks.length) - (user2.recepies.length + user2.cookbooks.length);
      });
    } else {
      event.textContent = 'Sort (Highest)';

      this.users = this.users.sort((user1, user2) => {
        return (user2.recepies.length + user2.cookbooks.length) - (user1.recepies.length + user1.cookbooks.length);
      });
    }
  }
}
