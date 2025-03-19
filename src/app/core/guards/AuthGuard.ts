import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UsersService } from "../services/users/users-service.service";

@Injectable()
export class AuthGuard  {

    /**
     * @inheritdoc
     * 
     * @param _usersService UsersService
     * @param _router Router
     */
    constructor(
        private _usersService: UsersService,
        private _router: Router) {
    }

    /**
     * @inheritdoc
     */
    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const authenticated = this._usersService.isLoggedIn();
        if(authenticated) {
            return true;
        }

        this._router.navigate(['/']);

        return false;
    }

    /**
     * @inheritdoc
     */
    canActivateChild(
        childRoute: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivate(childRoute, state);
    }
}
