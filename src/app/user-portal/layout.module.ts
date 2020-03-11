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
// import { SharedModule } from "@app/shared";

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    EditorModule,
    ProfileModule,
    DefaultPagesModule,
    UserModule
  ],
  declarations: [
    LayoutComponentComponent,
  ],
})
export class LayoutModule { }
