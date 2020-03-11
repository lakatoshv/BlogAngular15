import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularTokenService, AngularTokenModule } from 'angular-token';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularTokenModule,
    HttpModule
  ],
  providers:    [ AngularTokenService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

