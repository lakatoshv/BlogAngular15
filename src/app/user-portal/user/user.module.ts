import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AuthorizationComponent } from './authorization/authorization.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    EditorModule
  ],
  declarations: [
    AuthorizationComponent,
    RegistrationComponent
  ],
  exports: [
    AuthorizationComponent,
    RegistrationComponent
  ]
})
export class UserModule { }
