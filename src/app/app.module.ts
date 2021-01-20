import { AuthGuard } from './core/guards/AuthGuard';
import { UsersService } from './core/services/users/users-service.service';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularTokenService, AngularTokenModule } from 'angular-token';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CustomToastrService } from './core/services/custom-toastr.service';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularTokenModule.forRoot({}),
    ToastrModule.forRoot(),
    HttpModule
  ],
  providers:    [
    AngularTokenService,
    UsersService,
    AuthGuard,
    CustomToastrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

