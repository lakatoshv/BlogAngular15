import { PersonalInfoModule } from './personal-info/personal-info.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponentComponent } from './layout-component/layout-component.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ProfileModule } from './profile/profile.module';
import { RegistrationComponent } from './user/registration/registration.component';
import { AuthorizationComponent } from './user/authorization/authorization.component';
import { ErrorsModule } from '../shared/errors/errors.module';
import { DefaultPagesModule } from './default-pages/default-pages.module';
// import { SharedModule } from "@app/shared";

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ReactiveFormsModule,
    EditorModule,
    ProfileModule,
    PersonalInfoModule,
    ErrorsModule,
    DefaultPagesModule
  ],
  declarations: [
    LayoutComponentComponent,
    RegistrationComponent,
    AuthorizationComponent,
  ],
})
export class LayoutModule { }
