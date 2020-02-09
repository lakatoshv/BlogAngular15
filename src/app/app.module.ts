import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Angular2TokenService, A2tUiModule } from 'angular2-token';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    A2tUiModule,
    HttpModule
  ],
  providers:    [ Angular2TokenService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

