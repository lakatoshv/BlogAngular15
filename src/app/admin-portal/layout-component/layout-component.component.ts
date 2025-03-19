import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';
import { User } from 'src/app/core/models/User';
import { UsersService } from 'src/app/core/services/users/users-service.service';

@Component({
  selector: 'app-layout-component',
  templateUrl: './layout-component.component.html',
  styleUrls: ['./layout-component.component.css']
})
export class LayoutComponentComponent implements OnInit {
  /**
    * @param loggedIn boolean
    */
  loggedIn = false;

  /**
   * @param user User
   */
  public user: User | undefined;

  /**
   * @param navbarOpen boolean
   */
  navbarOpen = false;

  /**
   * @param globalService GlobalService
   * @param usersService UsersService
   */
  constructor(
    private globalService: GlobalService,
    private usersService: UsersService
  ) {
  }

  /**
   * @inheritdoc
   */
  ngOnInit() {
    this.loggedIn = this.usersService.isLoggedIn();
    if (this.loggedIn) {
      this.globalService.resetUserData();
      this.user = this.globalService._currentUser;
    }
  }

  /**
   * Toggle navbar on mobile
   */
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
