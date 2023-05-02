import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
declare var UIkit: any;
@Component({
  selector: 'app-first-setup',
  templateUrl: './first-setup.component.html',
  styleUrls: ['./first-setup.component.scss']
})
export class FirstSetupComponent implements OnInit, AfterViewInit {
  loader = false
  ngAfterViewInit(): void {
  }
  preferenceKeys = PreferenceKeys;
  userData: any;
  company_id: any
  owner_id: any
  constructor(
    private appPreference: AppPreference,
    private masterService: MasterServices,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getProfile()
  }

  getSetup() { }

  getProfile() {
    this.userData = {
      company: this.appPreference.getObject(PreferenceKeys.COMPANY),
      department: this.appPreference.getObject(PreferenceKeys.DEPARTMENT),
      branch: this.appPreference.getObject(PreferenceKeys.BRANCH),
      designation: this.appPreference.getObject(PreferenceKeys.DESIGNATION),
      userInfo: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO),
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO),
    }
    console.log(this.userData);
  }

  openCompanySetup() {
    // UIkit.modal("#add-company").show();
    this.router.navigate(["/masters/manage-company"]);
  }

  openBranch() {
    this.router.navigate(["/masters/manage-branch"]);
  }

  openDepartment() {
    this.router.navigate(["/masters/manage-department"]);
  }

  openDesignation() {
    this.router.navigate(["/masters/manage-designation"]);
  }

  finishSetup() {
    this.loader = true
    var temp = {
      "id": this.userData.userInfo.id
    }
    this.masterService.getSetup(temp).subscribe({
      next: (res: any) => {
        setTimeout(() => {
          this.loader = false
          this.company_id = res.setup.company_id
          this.owner_id = res.setup.owner_id
          this.appPreference.setObject(this.preferenceKeys.PROFILE_INFO, res.setup)
          this.attendenceConfig()
          this.router.navigate(["/setting/dashboard"]);
        }, 3000);
      }
    })
  }

  attendenceConfig() {
    console.log("attendence config done")
    var temp = {
      "configuration": {
        "check_in_out": {
          "c_in1": true,
          "c_in2": "",
          "c_in3": false,
          "c_in4": true,
          "c_in5": true,
          "c_in6": false,
          "c_in7": true,
          "c_in8": false,
          "c_in9": true,
          "c_in10": false,
          "c_in11": "",
          "c_in12": "",
          "c_in13": "",
          "c_in14": true,
          "c_in15": true,
          "c_in16": false,
          "c_in17": false,
          "c_in18": true,
          "c_in19": true,
          "c_in20": ""
        },
        "present_absent": {
          "PA_1": "",
          "PA_2": "",
          "PA_3": true,
          "PA_4": false,
          "PA_5": "",
          "PA_6": true,
          "PA_7": false,
          "PA_8": true,
          "PA_9": false,
          "PA_10": true,
          "PA_11": false,
          "PA_12": true,
          "PA_13": false
        },
        "shift": {
          "sc_1": true,
          "sc_2": false,
          "sc_3": true,
          "sc_4": false,
          "sc_5": false,
          "sc_6": true,
          "sc_7": "",
          "sc_8": true,
          "sc_9": false,
          "sc_10": ""
        },
        "regularization": {
          "r_1": "",
          "r_2": "",
          "r_3": "",
          "r_4": true,
          "r_5": false,
          "r_6": false,
          "r_7": true,
          "r_8": false,
          "r_9": "",
          "r_10": true,
          "r_11": false,
          "r_12": "",
          "r_13": true,
          "r_14": false,
          "r_15": ""
        },
        "subordinates": {
          "sc_1": true,
          "sc_2": false,
          "sc_3": false,
          "sc_4": true,
          "sc_5": true,
          "sc_6": false,
          "sc_7": false,
          "sc_8": false,
          "sc_9": true,
          "sc_10": true,
          "sc_11": "",
          "sc_12": true,
          "sc_13": false,
          "sc_14": false,
          "sc_15": true,
          "sc_16": true
        },
        "others": {
          "o_1": true,
          "o_2": "",
          "o_3": false,
          "o_4": false,
          "o_5": true,
          "o_6": true,
          "o_7": false,
          "o_8": true,
          "o_9": false,
          "o_10": "",
          "o_11": "",
          "o_12": "",
          "o_13": false,
          "o_14": "",
          "o_15": true,
          "o_16": "",
          "o_17": "",
          "o_18": false,
          "o_19": true,
          "o_20": true
        },
        "company_id": this.company_id,
        "owner_id": this.owner_id
      }
    }
    this.masterService.addConfiguration(temp).subscribe({
      next: (res: any) => {
        this.updateSetup(res.create_configuration.id)
        // this.appPreference.setObject(this.preferenceKeys.ATTENDENCE_CONFIG_ID, res.create_configuration.id)
      }, error: (e: any) => {
        console.log("error", e)
      }
    })
  }

  updateSetup(id: any) {
    var setup = {
      "id": this.userData.data.id,
      "attendence_config_id": id
    }
    this.masterService.updateFirstSetup(setup).subscribe({
      next: (res: any) => {
        console.log("success")
      }, error: (e: any) => {
        console.log("error", e)
      }
    })
  }

}
