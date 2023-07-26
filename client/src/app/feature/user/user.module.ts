import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { UserRoutingModule } from './user-routing.module';

import { ProfileComponent } from './profile/profile.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { MyMaterialModule } from 'src/app/shared/material.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    VerifyEmailComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    UserRoutingModule,
    MyMaterialModule,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    VerifyEmailComponent,
  ],
})
export class UserModule {}
