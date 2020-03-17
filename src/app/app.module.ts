import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularTokenService, AngularTokenModule } from 'angular-token';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularTokenModule.forRoot({}),
    HttpModule
  ],
  providers:    [ AngularTokenService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

