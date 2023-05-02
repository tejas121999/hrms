import { Component, OnInit } from '@angular/core';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  check=false;
  constructor(
    private appPreference: AppPreference,
  ) { }
  preferenceKeys = PreferenceKeys;
  userData: any;
  ngOnInit(): void {
    this.getProfile()
    this.check = this.userData?.data?.isfirst
  }

  getProfile() {
    this.userData = this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    console.log("this.userData",this.userData)
  }
}
