import { Component, OnInit, SimpleChanges } from '@angular/core';
import { DefaultValueAccessor, FormControl, FormGroup } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';

@Component({
  selector: 'app-attendance-configuration',
  templateUrl: './attendance-configuration.component.html',
  styleUrls: ['./attendance-configuration.component.scss']
})
export class AttendanceConfigurationComponent implements OnInit {
  preferenceKeys = PreferenceKeys;
  userData: any;
  getConfigData: any
  settingDone: boolean = false
  responce: any
  configuration_id: any
  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference,
  ) { }

  checkinForm = new FormGroup({
    formName: new FormControl("leave_balance"),
    c_in1: new FormControl(true),
    c_in2: new FormControl(""),
    c_in3: new FormControl(false),
    c_in4: new FormControl(true),
    c_in5: new FormControl(true),
    c_in6: new FormControl(false),
    c_in7: new FormControl(true),
    c_in8: new FormControl(false),
    c_in9: new FormControl(true),
    c_in10: new FormControl(false),
    c_in11: new FormControl(""),
    c_in12: new FormControl(""),
    c_in13: new FormControl(""),
    c_in14: new FormControl(true),
    c_in15: new FormControl(true),
    c_in16: new FormControl(false),
    c_in17: new FormControl(false),
    c_in18: new FormControl(true),
    c_in19: new FormControl(true),
    c_in20: new FormControl("")
  })

  presentAbsentForm = new FormGroup({
    formName: new FormControl("presentAbsentForm"),
    PA_1: new FormControl(""),
    PA_2: new FormControl(""),
    PA_3: new FormControl(true),
    PA_4: new FormControl(false),
    PA_5: new FormControl(""),
    PA_6: new FormControl(true),
    PA_7: new FormControl(false),
    PA_8: new FormControl(true),
    PA_9: new FormControl(false),
    PA_10: new FormControl(true),
    PA_11: new FormControl(false),
    PA_12: new FormControl(true),
    PA_13: new FormControl(false)
  })

  ShiftConfigForm = new FormGroup({
    formName: new FormControl("ShiftConfigForm"),
    sc_1: new FormControl(true),
    sc_2: new FormControl(false),
    sc_3: new FormControl(true),
    sc_4: new FormControl(false),
    sc_5: new FormControl(false),
    sc_6: new FormControl(true),
    sc_7: new FormControl(""),
    sc_8: new FormControl(true),
    sc_9: new FormControl(false),
    sc_10: new FormControl("")
  })

  RegularizationForm = new FormGroup({
    formName: new FormControl("RegularizationForm"),
    r_1: new FormControl(""),
    r_2: new FormControl(""),
    r_3: new FormControl(""),
    r_4: new FormControl(true),
    r_5: new FormControl(false),
    r_6: new FormControl(false),
    r_7: new FormControl(true),
    r_8: new FormControl(false),
    r_9: new FormControl(""),
    r_10: new FormControl(true),
    r_11: new FormControl(false),
    r_12: new FormControl(""),
    r_13: new FormControl(true),
    r_14: new FormControl(false),
    r_15: new FormControl("")
  })

  SubordinatesForm = new FormGroup({
    formName: new FormControl("SubordinatesForm"),
    sc_1: new FormControl(true),
    sc_2: new FormControl(false),
    sc_3: new FormControl(false),
    sc_4: new FormControl(true),
    sc_5: new FormControl(true),
    sc_6: new FormControl(false),
    sc_7: new FormControl(false),
    sc_8: new FormControl(false),
    sc_9: new FormControl(true),
    sc_10: new FormControl(true),
    sc_11: new FormControl(""),
    sc_12: new FormControl(true),
    sc_13: new FormControl(false),
    sc_14: new FormControl(false),
    sc_15: new FormControl(true),
    sc_16: new FormControl(true)
  })

  OthersConfigForm = new FormGroup({
    formName: new FormControl("OthersConfigForm"),
    o_1: new FormControl(true),
    o_2: new FormControl(""),
    o_3: new FormControl(false),
    o_4: new FormControl(false),
    o_5: new FormControl(true),
    o_6: new FormControl(true),
    o_7: new FormControl(false),
    o_8: new FormControl(true),
    o_9: new FormControl(false),
    o_10: new FormControl(""),
    o_11: new FormControl(""),
    o_12: new FormControl(""),
    o_13: new FormControl(false),
    o_14: new FormControl(""),
    o_15: new FormControl(true),
    o_16: new FormControl(""),
    o_17: new FormControl(""),
    o_18: new FormControl(false),
    o_19: new FormControl(true),
    o_20: new FormControl(true)
  })

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
    this.getProfile()
  }

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO),
      id: this.appPreference.getObject(PreferenceKeys.ATTENDENCE_CONFIG_ID)
    }
    this.getConfigurationById()
    console.log("company_id", this.userData.data.company_id, "owner_id", this.userData.data.owner_id)


  }


  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }
  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  DefaultValueAccessor() {

  }



  getConfigurationById() {
    console.log(this.userData?.data?.attendence_config_id)
    var temp = {
      "company_id": this.userData.data.company_id,
      "owner_id": this.userData.data.owner_id
    }

    console.log(temp)
    this.masterService.getConfigurationById(temp).subscribe({
      next: (res: any) => {
        console.log("res====", res.configuration)
        this.setup(res?.configuration)
        this.settingDone = true
        // this.getConfigData = res

        // this.checkinForm.patchValue(res.configuration.check_in_out)
        // this.presentAbsentForm.patchValue(res.configuration.present_absent)
        // this.ShiftConfigForm.patchValue(res.configuration.shift)
        // this.RegularizationForm.patchValue(res.configuration.regularization)
        // this.SubordinatesForm.patchValue(res.configuration.subordinates)
        // this.OthersConfigForm.patchValue(res.configuration.others)
      }, error: (e: any) => {
        this.settingDone = false
        console.log("error")
        if (this.responce === 400) {
          this.attendenceConfig()
        }
      }
    })
  }

  setup(data: any) {
    this.getConfigData = data
    console.log("data===", data.id)
    this.configuration_id = data.id
    this.checkinForm.patchValue(data.check_in_out)
    this.presentAbsentForm.patchValue(data.present_absent)
    this.ShiftConfigForm.patchValue(data.shift)
    this.RegularizationForm.patchValue(data.regularization)
    this.SubordinatesForm.patchValue(data.subordinates)
    this.OthersConfigForm.patchValue(data.others)
  }


  attendenceConfig() {
    console.log("hello")
    var temp = {
      "configuration": {
        "check_in_out": this.checkinForm.value,
        "present_absent": this.presentAbsentForm.value,
        "shift": this.ShiftConfigForm.value,
        "regularization": this.RegularizationForm.value,
        "subordinates": this.SubordinatesForm.value,
        "others": this.OthersConfigForm.value,
        "company_id": this.userData.data.company_id,
        "owner_id": this.userData.data.owner_id
      }
    }
    console.log(temp)
    this.masterService.addConfiguration(temp).subscribe({
      next: (res: any) => {
        this.updateSetup(res.create_configuration.id)
        // this.appPreference.setObject(this.preferenceKeys.ATTENDENCE_CONFIG_ID, res.create_configuration.id)
      }, error: (e: any) => {
        this.handleError("Internal Serever Error")
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

  editConfiguration() {
    var temp = {
      "configuration_id": this.configuration_id,
      "configuration": {
        "check_in_out": this.checkinForm.value,
        "present_absent": this.presentAbsentForm.value,
        "shift": this.ShiftConfigForm.value,
        "regularization": this.RegularizationForm.value,
        "subordinates": this.SubordinatesForm.value,
        "others": this.OthersConfigForm.value
      }
    }
    this.masterService.editConfiguration(temp).subscribe({
      next: (res: any) => {
        this.handleSuccess("Configuration Update Successfully")
        this.getConfigurationById()
        // window.location.reload();
      }, error: (e: any) => {
        this.handleError("Internal Serever Error")
      }
    })
  }





  weekly_off = [
    { name: "Consider Absent" },
    { name: "Consider Holiday" }
  ]

  non_halfday = [
    { name: "Working" },
    { name: "Weekly Off" }
  ]

  attendance_period = [
    { name: "1 st" },
    { name: "2 nd" },
    { name: "3 rd" },
    { name: "4 th" },
    { name: "5 th" },
    { name: "6 th" },
    { name: "7 th" },
    { name: "8 th" },
    { name: "9 th" },
    { name: "10 th" },
    { name: "11 th" },
    { name: "12 th" },
    { name: "13 th" },
    { name: "14 th" },
    { name: "15 th" },
    { name: "16 th" },
    { name: "17 th" },
    { name: "18 th" },
    { name: "19 th" },
    { name: "20 th" },
    { name: "21 st" },
    { name: "22 nd" },
    { name: "23 rd" },
    { name: "24 th" },
    { name: "25 th" },
    { name: "26 th" },
    { name: "27 th" },
    { name: "28 th" },
    { name: "29 th" },
    { name: "30 th" },
    { name: "Last day of the Month" }
  ]

  employee_status = [
    { name: "Terminated" },
    { name: "Left" },
    { name: "Retired" },
    { name: "Absconding" },
    { name: "Death in Service" },
    { name: "Permanent" },
    { name: "Suspended" },
    { name: "Retrenchment" },
    { name: "Pending" }
  ]

  credit_leave = [
    { name: "Loss of Pay" },
    { name: "Privilege Leave" }
  ]

  calendar_week = [
    { name: "Monday" },
    { name: "Tuesday" },
    { name: "Wednesday" },
    { name: "Thursday" },
    { name: "Friday" },
    { name: "Saturday" },
    { name: "Sunday" }
  ]

}
