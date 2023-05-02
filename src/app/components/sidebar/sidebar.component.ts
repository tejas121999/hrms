import { Component, OnInit } from '@angular/core';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isOpen = true;
  // currentTab: String = ""
  // index: number = 0;
  // active = false;


  constructor(
    private appPreference: AppPreference,
  ) { }
  preferenceKeys = PreferenceKeys;
  enableNave: any;
  ngOnInit(): void {
    this.getProfile();
    this.toggle()
  }


  permission: any;
  accessPermission: any;

  getProfile() {
    this.enableNave = this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    console.log(this.enableNave.isFirst);
    this.accessPermission = {
      accessdata: this.appPreference.getObject(PreferenceKeys.ACCESS)
    }
    this.permission = this.accessPermission?.accessdata
    console.log("this.permission.attendence", this.permission.attendence);

  }

  // setCurrentTab(tab: any){
  //   switch(tab){
  //     case 0:
  //       this.currentTab = 'master'
  //       this.index = 0;
  //       this.active = true
  //       break;
  //       case 1:
  //         this.currentTab = 'attendance-collapse';
  //         this.index = 1;
  //         this.active = true
  //         break;
  //       case 2:
  //         this.currentTab = 'attendance-collapse'
  //         this.index = 2;
  //         this.active = true
  //         break;
  //       case 3:
  //         this.currentTab = 'bank-info'
  //         this.index = 3;
  //         this.active = true
  //         break;
  //   }
  // }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}



