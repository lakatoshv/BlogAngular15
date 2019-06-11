import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../models/user';
import { Users } from '../../data/users';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private _jwt = new JwtHelperService();
  public _isLoadedData: boolean = false;
  public _currentUser: User;
  public _avatarUrl: string;
  _roles: string[];
  //public _roles: any[];

  constructor() { }
  public getRouteParam(idName: string, activatedRoute: ActivatedRoute): string {
    var snapshot = activatedRoute.snapshot;
    return this._getId(idName, snapshot);
  }
  private _getId(idName: string, routeObject: ActivatedRouteSnapshot): string {
    if (!routeObject)
        return null;

    if (routeObject.paramMap.get(idName) !== null)
        return routeObject.paramMap.get(idName);
    else
        return this._getId(idName, routeObject.parent);
  }

  public initializeData(response): void {
    if (response.currentUser)
        this._currentUser = response.currentUser;
  }

  public resetUserData(): void {
    let user = localStorage.getItem('user');
    if (user) {
        this._currentUser = this.decode(user);
        //this._avatarUrl = this._currentUser.AvatarUrl;
        this._roles = this._currentUser.Roles;

        //this.onAvatarChanged.next(this._currentUser.AvatarUrl);
        }
    else
        this._isLoadedData = true;
  }
  public decode(userString: string): User {
    let user = JSON.parse(userString);
    user.Roles = Users[user.Id]
    return user;
}
}
