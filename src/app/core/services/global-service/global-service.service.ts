import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../models/User';
import { Users } from '../../data/UsersList';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  /**
   * @param _jwt JwtHelperService
   */
  private _jwt = new JwtHelperService();

  /**
   * @param _isLoadedData boolean
   */
  public _isLoadedData = false;

  /**
   * @param _currentUser User
   */
  public _currentUser: User | undefined;

  /**
   * @param _avatarUrl string
   */
  public _avatarUrl: string | undefined;

  /**
   * @param _roles string[]
   */
  public _roles: string[] = [];

  /**
   * @inheritdoc
   */
  constructor() { }

  /**
   * Return property value by URL
   * @param idName string
   * @param activatedRoute ActivatedRoute
   * @returns string|null
   */
  public getRouteParam(
    idName: string,
    activatedRoute: ActivatedRoute
  ): string|null {
    const snapshot = activatedRoute.snapshot;
    return this._getId(idName, snapshot);
  }

  /**
   * Return property value by URL
   * @param idName string
   * @param routeObject ActivatedRouteSnapshot
   * @returns string|null
   */
  private _getId(
    idName: string,
    routeObject: ActivatedRouteSnapshot | null
  ): string|null {
    if (!routeObject) {
        return null;
    }

    if (routeObject.paramMap.get(idName) !== null) {
        return routeObject.paramMap.get(idName);
    } else {
        return this._getId(idName, routeObject.parent);
    }
  }

  /**
   * Initialize current user data from response.
   * @param response any
   * @returns void
   */
  public initializeData(response: any): void {
    if (response.currentUser) {
        this._currentUser = response.currentUser;
    }
  }

  /**
   * Reset user data.
   * @returns void
   */
  public resetUserData(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this._currentUser = this.decode(user);
      // this._avatarUrl = this._currentUser.AvatarUrl;
      this._roles = this._currentUser.Roles;

      // this.onAvatarChanged.next(this._currentUser.AvatarUrl);
    } else {
      this._isLoadedData = true;
    }
  }

  /**
   * @param userString string
   * @returns User
   */
  public decode(userString: string): User {
    const user = JSON.parse(userString);
    user.Roles = Users[user.Id];
    return user;
  }
}
