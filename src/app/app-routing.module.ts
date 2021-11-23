import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCookbooksComponent } from './all-cookbooks/all-cookbooks.component';
import { AllRecepiesComponent } from './all-recepies/all-recepies.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomeComponent } from './home/home.component';
import { HomeGuard } from './homeguard/home.guard';
import { ProfileCookbooksComponent } from './profile-cookbooks/profile-cookbooks.component';
import { ProfileRecepiesComponent } from './profile-recepies/profile-recepies.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: 'sign-in', 
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'change-pass', 
    component: ChangePasswordComponent
  },
  {
    path: 'recepies/:name',
    component: AllRecepiesComponent
  },
  {
    path: 'cookbooks', 
    component: AllCookbooksComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {path: 'cookbooks', component: ProfileCookbooksComponent},
      {path: 'recepies', component: ProfileRecepiesComponent},
      {path: 'settings', component: ProfileSettingsComponent},
    ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [
      HomeGuard
    ]
  },
  {
    path: '', 
    component: SignInComponent
  },
  {
    path: '**', 
    component: SignInComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
