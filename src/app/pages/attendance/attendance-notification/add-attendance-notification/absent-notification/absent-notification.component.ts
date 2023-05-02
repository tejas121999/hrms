import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { ManageAttendanceNotificationComponent } from '../../manage-attendance-notification/manage-attendance-notification.component';
declare var UIkit: any;

@Component({
  selector: 'app-absent-notification',
  templateUrl: './absent-notification.component.html',
  styleUrls: ['./absent-notification.component.scss']
})
export class AbsentNotificationComponent implements OnInit {

  constructor(
    private formValidator: FormValidator,
    private masterService: MasterServices,
    private appPreference: AppPreference,
    private manageAttendence: ManageAttendanceNotificationComponent
  ) { }

  preferenceKeys = PreferenceKeys;
  userData: any;
  departmentData: any[] = []
  @Input('isEditAbsent') isEditAbsent: boolean = false;
  _id: any
  payloade: any[] = []
  department: any[] = []

  absentNotification = new FormGroup({
    formName: new FormControl("companyForm"),
    department_name: new FormControl(""),
    send_absent_notification_to: new FormControl(""),
  })

  ngOnInit(): void {
    this.getProfile()
    this.setupEdit()
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }
  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }
    this.getDepartment()
  }

  getDepartment() {
    var temp = {
      "where": false,
      "limit": 1000000,
      "offset": 0,
      "department_owner_id": this.userData?.data?.owner_id
    }
    this.masterService.getDepartment(temp).subscribe({
      next: (res: any) => {
        this.departmentData = res.department.rows
      },
      error: (err: any) => {
        this.handleError('Serve Error')
      }
    })
  }
  managerName: any = []
  getManagerName() {
    var temp = {
      id: this.absentNotification.get("department_name")?.value
    }
    this.masterService.getDepartmentById(temp).subscribe({
      next: (res: any) => {
        console.log(res.department)
        res?.department.forEach((element: any) => {
          var temp = {
            "manager_name": element.manager_data.first_name
          }
          this.managerName.push(temp)
        });
        this.absentNotification.get("send_absent_notification_to")?.setValue(this.managerName)
      }, error: (e: any) => {
        console.log(e)
      }
    })
  }

  addAbsentNotification() {
    console.log("hello")
    var data1: any = []
    var data2: any
    data1 = this.absentNotification.get("department_name")?.value
    data2 = this.managerName
    data1.forEach((data: any) => {
      var temp = {
        "department_id": data
      }
      this.department.push(temp)
    })
    this.department.forEach((data: any) => {
      data2.forEach((element: any) => {
        this.payloade.push({ "owner_id": this.userData?.data?.owner_id, "department_id": data.department_id, "send_absent_notification_to": element.manager_name })
      })
    })
    var temp = {
      "settings": this.payloade
    }
    this.masterService.addAbsentNotification(temp).subscribe({
      next: (data: any) => {
        this.reset()
        this.handleSuccess("Record Has Been Added Successfully")
      }, error: (e: any) => {
        this.reset()
        this.handleError("server Error")
      }
    })
  }

  setupEdit() {
    this.manageAttendence.editAbsent.subscribe({
      next: (data: any) => {
        this.isEditAbsent = true
        this._id = data.id
        var dept: any = []
        dept.push(data.department_id)
        var manager: any = []
        manager.push(data.send_approval_notification_to)
        this.absentNotification.get("department_name")?.patchValue(dept)
        this.absentNotification.get("send_absent_notification_to")?.patchValue(manager)
      }
    })
  }

  updateAbsentNotification() {
    var data1: any = []
    var data2: any
    data1 = this.absentNotification.get("department_name")?.value
    data2 = this.absentNotification.get("send_absent_notification_to")?.value
    data1.forEach((data: any) => {
      var temp = {
        "department_id": data
      }
      this.department.push(temp)
    })
    this.department.forEach((data: any) => {
      data2.forEach((element: any) => {
        this.payloade.push({ "owner_id": this.userData?.data?.owner_id, "department_id": data.department_id, "send_absent_notification_to": element.manager_name })
      })
    })
    var temp = {
      "_id": this._id,
      "setting": this.payloade[0]
    }
    this.masterService.updateAbsentNotification(temp).subscribe({
      next: (data: any) => {
        this.reset()
        this.handleSuccess("Record Has Been Updated Successfully")
      }, error: (e: any) => {
        this.reset()
        this.handleError("server Error")
      }
    })
  }


  removeManagerName(event: any) {
    console.log("exestingManager", event)
    // let exestingManager = this.absentNotification.get("send_absent_notification_to")?.value
    // let newManager 
    // newManager = exestingManager?.replace()
  }


  reset() {
    this.manageAttendence.getAbsentAttendance()
    this.isEditAbsent = false
    this.absentNotification.reset()
    // window.location.reload()
    UIkit.modal("#add-absent-notification").hide();
  }

}
