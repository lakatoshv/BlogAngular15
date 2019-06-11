import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';
import { UsersService } from 'src/app/core/services/users/users-service.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-layout-component',
  templateUrl: './layout-component.component.html',
  styleUrls: ['./layout-component.component.css']
})
export class LayoutComponentComponent implements OnInit {
  private _navbarOpen: boolean = false;
  loggedIn: boolean = false;
  public user: User;

  constructor(
    private globalService: GlobalService,
    private usersService: UsersService
  ) {
  }

  ngOnInit() {
    this.loggedIn = this.usersService.isLoggedIn();
    if(this.loggedIn){
      this.globalService.resetUserData();  
      this.user = this.globalService._currentUser;
    }
  }
  
  toggleNavbar() {
    this._navbarOpen = !this._navbarOpen;
  }

}
