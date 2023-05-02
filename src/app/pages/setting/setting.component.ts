import { Component, OnInit } from '@angular/core';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  constructor(
    private appPreference: AppPreference,
  ) { }
  preferenceKeys = PreferenceKeys;
  isFirst: any;
  ngOnInit(): void {
    
  }

  getProfile() {
    this.isFirst = this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    console.log("this.userData.company", this.isFirst.isFirst)
  }

}
