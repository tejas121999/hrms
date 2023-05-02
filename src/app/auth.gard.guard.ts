import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppPreference } from './shared/app-preference';

@Injectable({
  providedIn: 'root'
})
export class AuthGardGuard implements CanActivate {
  constructor(private router: Router, private appPreference: AppPreference) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.appPreference.isUserLoggedIn()) {
        let link = window.location.href;
        if(!link.includes('forgot-password'))
          this.router.navigate(["/"]);
        return false;
      } else {
        return true;
      }
  }
  
}
