import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponentComponent } from './layout-component/layout-component.component';
import { SharedModule } from '../shared';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AuthorizationComponent } from './user/authorization/authorization.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { RegistrationComponent } from './user/registration/registration.component';
import { AboutComponent } from './default-pages/about/about.component';
import { ContactsComponent } from './default-pages/contacts/contacts.component';
// import { SharedModule } from "@app/shared";

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    EditorModule
  ],
  declarations: [
    LayoutComponentComponent, 
    AboutComponent, 
    ContactsComponent,
    RegistrationComponent,
    AuthorizationComponent
  ],
})
export class LayoutModule { }
