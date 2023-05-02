import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppPreference } from '../shared/app-preference';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private appPreference: AppPreference) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.appPreference.isUserLoggedIn()) {
      let link = window.location.href;
      console.log("============", link)
      if (!link.includes('forgot-password'))
        this.router.navigate(["/"]);
      return false;
    } else {
      return true;
    }
  }

}
