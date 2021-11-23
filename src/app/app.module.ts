import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { HomeGuard } from './homeguard/home.guard';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileCookbooksComponent } from './profile-cookbooks/profile-cookbooks.component';
import { ProfileRecepiesComponent } from './profile-recepies/profile-recepies.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { CookbookCreationComponent } from './cookbook-creation/cookbook-creation.component';
import { RecepiCreationComponent } from './recepi-creation/recepi-creation.component';
import { CookbookUpdateComponent } from './cookbook-update/cookbook-update.component';
import { RecepiUpdateComponent } from './recepi-update/recepi-update.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AllRecepiesComponent } from './all-recepies/all-recepies.component';
import { AllCookbooksComponent } from './all-cookbooks/all-cookbooks.component';
import { CookbookViewComponent } from './cookbook-view/cookbook-view.component';
import { RecepiViewComponent } from './recepi-view/recepi-view.component';

const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'left',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    HeaderComponent,
    ProfileComponent,
    FooterComponent,
    ProfileCookbooksComponent,
    ProfileRecepiesComponent,
    ProfileSettingsComponent,
    CookbookCreationComponent,
    RecepiCreationComponent,
    CookbookUpdateComponent,
    RecepiUpdateComponent,
    ChangePasswordComponent,
    AllRecepiesComponent,
    AllCookbooksComponent,
    CookbookViewComponent,
    RecepiViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
  providers: [
    HomeGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
