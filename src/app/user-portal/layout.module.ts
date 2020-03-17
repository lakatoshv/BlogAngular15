import { UserModule } from './user/user.module';
import { DefaultPagesModule } from './../admin-portal/default-pages/default-pages.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponentComponent } from './layout-component/layout-component.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ProfileModule } from './profile/profile.module';
import { AboutComponent } from './default-pages/about/about.component';
import { ContactsComponent } from './default-pages/contacts/contacts.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { AuthorizationComponent } from './user/authorization/authorization.component';
// import { SharedModule } from "@app/shared";

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    EditorModule,
    ProfileModule
  ],
  declarations: [
    LayoutComponentComponent, 
    AboutComponent, 
    ContactsComponent,
    RegistrationComponent,
    AuthorizationComponent,
  ],
})
export class LayoutModule { }
