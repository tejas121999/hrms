import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  preferenceKeys = PreferenceKeys;
  userData: any;
  checktoggle:any
  getLeaveData: any[] = []
  settingDone: boolean = false
  responce: any
  leaveType:any=[]
  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference,
  ) { }

  leave_balance = new FormGroup({
    formName: new FormControl("leave_balance"),
    clb_1: new FormControl(true),
    clb_2: new FormControl(""),
    clb_11:new FormControl(""),
    clb_3: new FormControl(false),
    clb_4: new FormControl(""),
    clb_5: new FormControl(""),
    clb_6: new FormControl(true),
    clb_7: new FormControl(false),
    clb_8: new FormControl(false),
    clb_9: new FormControl(""),
    clb_10: new FormControl(true),
  })

  Approval_Configuration = new FormGroup({
    formName: new FormControl("Approval_Configuration"),
    ac_1: new FormControl(true),
    ac_2: new FormControl(false),
    ac_3: new FormControl(true),
    ac_4: new FormControl(""),
    ac_5: new FormControl(""),
    ac_6: new FormControl(""),
    ac_7: new FormControl(false),
    ac_8: new FormControl(""),
    ac_9: new FormControl(true),
    ac_10: new FormControl(false),
    ac_11: new FormControl(true),
    ac_12: new FormControl(""),
    ac_13: new FormControl(false),
    ac_14: new FormControl(true),
    ac_15: new FormControl(""),
  })

  Subordinates = new FormGroup({
    formName: new FormControl("Subordinates"),
    sc_1: new FormControl(false),
    sc_2: new FormControl(true),
    sc_3: new FormControl(true),
    sc_4: new FormControl(false),
    sc_5: new FormControl(false),
    sc_6: new FormControl(true),
    sc_7: new FormControl(true),
    sc_8: new FormControl(""),
  })

  Leave_Master = new FormGroup({
    formName: new FormControl("Leave_Master"),
    lmc_1: new FormControl(""),
    lmc_2: new FormControl(""),
    lmc_3: new FormControl(true),
    lmc_4: new FormControl(false),
    lmc_5: new FormControl(""),
    lmc_6: new FormControl(""),
    lmc_7: new FormControl(true),
    lmc_8: new FormControl(false),
    lmc_9: new FormControl(true),
    lmc_10: new FormControl(""),
    lmc_11: new FormControl(""),
    lmc_12: new FormControl(false),
    lmc_13: new FormControl(true),
    lmc_14: new FormControl(""),
    lmc_15: new FormControl(""),
  })

  ngOnInit(): void {
    this.getProfile();
    // this.getLeavenmae();
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }
  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }
  // getLeaveDay(i: any) {

  // }
  getProfile() {
    this.userData = {
      id: this.appPreference.getObject(PreferenceKeys.LEAVE_CONFIG_ID),
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }
    this.getConfigById()
    // console.log("this.getLeaveData", this.getLeaveData)
    // if (!this.getLeaveData || this.responce === 404) {
    //   this.addConfiguration()
    // }
  }
  _id: any
  addConfiguration() {
    var temp = {
      "configuration": {
        "leave_balance": this.leave_balance.value,
        "approval": this.Approval_Configuration.value,
        "subordinates": this.Subordinates.value,
        "leave_meter": this.Leave_Master.value,
        "owner_id": this.userData?.data?.owner_id,
        "company_id": this.userData?.data?.company_id,
      }
    }
    this.masterService.addLeaveConfig(temp).subscribe({
      next: (res: any) => {
        console.log("Leave Config Added Successfully")
        console.log(res.create_configuration.id)
        this.updateSetup(res.create_configuration.id)
        // this._id = res.create_configuration.id
        this.appPreference.setObject(this.preferenceKeys.LEAVE_CONFIG_ID, res.create_configuration.id)
        this.handleSuccess("Create Leave Config")
      }, error: (e: any) => {
        this.handleError("Internal Serever Error")
      }
    })
  }

  updateSetup(id: any) {
    var setup = {
      "id": this.userData.data.id,
      "leave_config_id": id
    }
    this.masterService.updateFirstSetup(setup).subscribe({
      next: (res: any) => {
        console.log("success")
        this.getsetup()
      }
    })
  }

  getsetup() {
    var temp = {
      "id": this.userData.data.id
    }
    this.masterService.getSetup(temp).subscribe({
      next: (res: any) => {
        this.appPreference.setObject(this.preferenceKeys.PROFILE_INFO, res.setup)
      }
    })
  }


  getConfigById() {
    var temp = {
      "owner_id": this.userData?.data?.owner_id,
      "company_id": this.userData?.data?.company_id,
    }
    this.masterService.getLeaveConfig(temp).subscribe({
      next: (res: any) => {
        console.log("======",res)
        this.getLeaveData = res.configuration
        // if (!this.getLeaveData) {
        //   this.addConfiguration()
        // }
        this.leave_balance.patchValue(res.configuration.leave_balance)
        this.Approval_Configuration.patchValue(res.configuration.approval)
        this.Subordinates.patchValue(res.configuration.subordinates)
        this.Leave_Master.patchValue(res.configuration.leave_meter)
      }, error: (e: any) => {
        this.responce = e.status
        if (e.status === 404) {
          this.addConfiguration()
        }
      }
    })
  }

  editConfiguration() {
    var temp = {
      "configuration_id": this.userData?.data?.leave_config_id,
      "configuration": {
        "leave_balance": this.leave_balance.value,
        "approval": this.Approval_Configuration.value,
        "subordinates": this.Subordinates.value,
        "leave_meter": this.Leave_Master.value,
        "owner_id": this.userData?.data?.owner_id
      }
    }
    console.log(temp);


    this.masterService.editLeaveConfig(temp).subscribe({
      next: (res: any) => {
        this.handleSuccess("Configuration Update Successfully")
        this.getConfigById()
      }, error: (e: any) => {
        this.handleError("Internal Serever Error")
      }
    })
  }
  checkToggle(e:any){

 console.log(e.target.checked);


 this.checktoggle = e.target.checked
  }
  getLeavenmae() {
    var temp = {
      leave_emp_id: this.userData.data.user_emp_ID,
      company_id: this.userData.data.company_id,
      owner_id: this.userData.data.owner_id
    };

    this.masterService.getLeave(temp).subscribe({
      next: (res: any) => {
        this.leaveType = res.leave;
        console.log('leaves', res.leave);
      },
      error: (err: any) => {
        this.handleError(err);
      },
    });
  }

  consider_balance = [
    { name: "Current Balance" },
    { name: "Leave From Date Balance" }
  ]

  deduct_balance = [
    { name: "While Approving" },
    { name: "While Applying" }
  ]

  leave_status = [
    { name: "Reject" },
    { name: "Approve" }
  ]

  deduct_leave = [
    { name: "While Approving" },
    { name: "While Applying" }
  ]

  leave_calculation = [
    { name: "Loss of Pay" },
    { name: "Privilege" }
  ]

  leave_view = [
    { name: "Card View" },
    { name: "List View" }
  ]

  report_filter = [
    { name: "Consider MLWF" },
    { name: "Consider KLWF" }
  ]


}
