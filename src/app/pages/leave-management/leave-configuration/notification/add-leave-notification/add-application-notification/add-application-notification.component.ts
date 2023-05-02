import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { ManageLeaveNotificationComponent } from '../../manage-leave-notification/manage-leave-notification.component';
declare var UIkit: any;

@Component({
  selector: 'app-add-application-notification',
  templateUrl: './add-application-notification.component.html',
  styleUrls: ['./add-application-notification.component.scss']
})
export class AddApplicationNotificationComponent implements OnInit {

  preferenceKeys = PreferenceKeys;
  userData: any;
  departmentData: any[] = []
  managerName: any = []
  payloade: any[] = []
  department: any[] = []
  @Input('isEditAppNoti') isEditAppNoti: boolean = false;
  _id: any

  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference,
    private manageApplicationNoti: ManageLeaveNotificationComponent
  ) { }

  ngOnInit(): void {
    this.getProfile()
    this.setupEdit()
  }

  applicationNotificationForm = new FormGroup({
    formName: new FormControl("applicationNotificationForm"),
    department: new FormControl(''),
    send_notification: new FormControl('')
  })

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
        // console.log("jjjjjjjj", res)
      },
      error: (err: any) => {
        this.handleError('Serve Error')
      }
    })
  }

  getManagerName() {
    console.log()
    var temp = {
      id: this.applicationNotificationForm.get("department")?.value
    }
    this.masterService.getDepartmentById(temp).subscribe({
      next: (res: any) => {
        console.log(res.department)
        res?.department.forEach((element: any) => {
          var temp = {
            "manager_name": element?.first_name
          }
          this.managerName.push(temp)
        });
        console.log("this.managerName", this.managerName)
        this.applicationNotificationForm.get("send_notification")?.setValue(this.managerName)
      }, error: (e: any) => {
        console.log(e)
      }
    })
  }

  addAppNoti() {
    var data1: any = []
    var data2: any
    data1 = this.applicationNotificationForm.get("department")?.value
    data2 = this.managerName
    data1.forEach((data: any) => {
      var temp = {
        "department_id": data,
        "send_application_notification_to": data?.send_application_notification_to
      }
      this.department.push(temp)
    })
    this.department.forEach((data: any) => {
      data2.forEach((element: any) => {
        this.payloade.push({ "owner_id": this.userData?.data?.owner_id, "department_id": data.department_id, "send_application_notification_to": element.manager_name })
      })
    })
    var temp = {
      "data": this.payloade
    }

    this.masterService.addAppNoti(temp).subscribe({
      next: (data: any) => {
        this.reset()
        this.handleSuccess("Leave Application Notification Added Successfully")
      }, error: (e: any) => {
        this.reset()
        this.handleError("server Error")
      }
    })
  }

  setupEdit() {
    this.manageApplicationNoti.editAppNoti.subscribe({
      next: (data: any) => {
        this._id = data.id
        var dept: any = []
        dept.push(data.department_id)
        var manager: any = []
        manager.push(data.send_application_notification_to)
        this.applicationNotificationForm.get('department')?.patchValue(dept)
        this.applicationNotificationForm.get('send_notification')?.patchValue(manager)
      }
    })
  }

  updateAppNoti() {
    var data1: any = []
    var data2: any
    data1 = this.applicationNotificationForm.get("department")?.value
    data2 = this.applicationNotificationForm.get("send_notification")?.value
    data1.forEach((data: any) => {
      var temp = {
        "department_id": data,
      }
      console.log("ID", temp)
      this.department.push(temp)
    })
    this.department.forEach((data: any) => {
      data2.forEach((element: any) => {
        console.log(element.manager_name)
        this.payloade.push({ "department_id": data.department_id, "send_application_notification_to": element.manager_name })
      })
    })
    var temp = {
      "id": this._id,
      "data": this.payloade[0]
    }
    console.log("temp==", temp)
    this.masterService.updateAppNoti(temp).subscribe({
      next: (data: any) => {
        this.reset()
        this.handleSuccess("Leave Application Notification Updated Successfully")
      }, error: (e: any) => {
        this.reset()
        this.handleError("server Error")
      }
    })
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }
  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  reset() {
    this.manageApplicationNoti.getAppNoti()
    this.applicationNotificationForm.reset()
    UIkit.modal("#add-app-noti").hide();
    window.location.reload()
  }

}
