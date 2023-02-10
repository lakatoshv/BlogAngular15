import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribeFormComponent } from './subscribe-form/subscribe-form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SubscribeFormComponent],
  exports: [
    CommonModule,
    SubscribeFormComponent
  ]
})
export class SharedModule { }
