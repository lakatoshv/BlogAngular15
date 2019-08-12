import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
  ],
  declarations: [ProfilePageComponent, EditProfileComponent],
  exports: [ProfilePageComponent]
})
export class ProfileModule { }
