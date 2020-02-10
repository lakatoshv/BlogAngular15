import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Angular2TokenService, A2tUiModule } from 'angular2-token';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    A2tUiModule,
    HttpModule
  ],
  providers:    [ Angular2TokenService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

