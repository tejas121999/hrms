import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';

@Component({
  selector: 'app-leave-configuration',
  templateUrl: './leave-configuration.component.html',
  styleUrls: ['./leave-configuration.component.scss']
})
export class LeaveConfigurationComponent implements OnInit {
  userData: any;
  preferenceKeys = PreferenceKeys;
  leaveConfigTypeData: any[] = []
  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference,
  ) { }

  ngOnInit(): void {
    this.getProfile()
  }

  leaveTypeConfigForm = new FormGroup({
    formName: new FormControl("leaveTypeConfigForm"),
    LTC_1: new FormControl(""),
    LTC_2: new FormControl(""),
    LTC_3: new FormControl(""),
    LTC_4: new FormControl(""),
    LTC_5: new FormControl(""),
    LTC_6: new FormControl(""),
    LTC_7: new FormControl(""),
    LTC_8: new FormControl(""),
    LTC_9: new FormControl(""),
    LTC_10: new FormControl(""),
    LTC_11: new FormControl("")
  })

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }
  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO),
      id: this.appPreference.getObject(PreferenceKeys.LEAVE_TYPE_CONFIG_ID)
    }
    this.getLeaveConfigById()
  }

  addLeaveTypeConfig() {
    console.log("hello")
    var temp = {
      "data": this.leaveTypeConfigForm.value,
      "company_id": 48,
      "owner_id": this.userData?.data?.owner_id
    }
    this.masterService.addLeaveTypeConfig(temp).subscribe({
      next: (res: any) => {
        console.log(res.leaveType.id)
        this.getLeaveConfigById()
        var setup = {
          "id": this.userData.data.id,
          "leave_config_type_id": res.leaveType.id
        }
        this.masterService.updateSetup(setup).subscribe({
          next: (res: any) => {
            this.appPreference.setObject(this.preferenceKeys.LEAVE_TYPE_CONFIG_ID, res.leaveType.id)
          }
        })
        this.handleSuccess("Config Added Successfully")
      }, error: (e: any) => {
        this.handleError("Internal Serever Error")
      }
    })
  }

  updateTypeConfig() {
    var temp = {
      "data": this.leaveTypeConfigForm.value,
      "company_id": 48,
      "owner_id": this.userData?.data?.owner_id
    }

    this.masterService.updateLeaveTypeConfig(temp).subscribe({
      next: (res: any) => {
        this.handleSuccess("Leave Created Successfully")
        this.getLeaveConfigById()
      }, error: (e: any) => {
        this.handleError("Internal Serever Error")
      }
    })
  }


  getLeaveConfigById() {
    if (this.userData?.data?.leave_config_type_id != null || this.userData?.id != null) {
      var temp = {
        "id": this.userData?.data?.leave_config_type_id || this.userData?.id
      }
      this.masterService.getLeaveConfigById(temp).subscribe({
        next: (res: any) => {
          this.leaveConfigTypeData = res
          this.leaveTypeConfigForm.patchValue(res.leaveTyp.data)
        }, error: (e: any) => {
          this.handleError("Internal Serever Error")
        }
      })
    }
  }

  options = [
    { name: "Yes" },
    { name: "No" }
  ]

}
