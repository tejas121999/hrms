import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { ManageAttendanceNotificationComponent } from '../../manage-attendance-notification/manage-attendance-notification.component';
declare var UIkit: any;

@Component({
  selector: 'app-approval-notification',
  templateUrl: './approval-notification.component.html',
  styleUrls: ['./approval-notification.component.scss']
})
export class ApprovalNotificationComponent implements OnInit {

  constructor(
    private formValidator: FormValidator,
    private masterService: MasterServices,
    private appPreference: AppPreference,
    private manageAttendence: ManageAttendanceNotificationComponent
  ) { }

  preferenceKeys = PreferenceKeys;
  userData: any;
  departmentData: any[] = []
  managerName: any = []
  payloade: any[] = []
  department: any[] = []
  // isEditApproval: boolean = false
  // @Input('isEditApproval') isEditAbsent: boolean = false
  @Input('isEditApproval') isEditApproval: boolean = false;
  _id: any


  approvalForm = new FormGroup({
    formName: new FormControl("approvalForm"),
    department_name: new FormControl(""),
    add_approval_notification: new FormControl(""),
  })

  ngOnInit(): void {
    this.getProfile()
    this.setupEdit()
  }

  reset() {
    this.manageAttendence.getApproveAttendance()
    this.isEditApproval = false
    this.approvalForm.reset()
    UIkit.modal("#add-approval-notification").hide();
    window.location.reload()
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



  addApproveNotification() {
    var data1: any = []
    var data2: any
    data1 = this.approvalForm.get("department_name")?.value
    data2 = this.approvalForm.get("add_approval_notification")?.value
    data1.forEach((data: any) => {
      var temp = {
        "department_id": data
      }
      this.department.push(temp)
    })
    this.department.forEach((data: any) => {
      data2.forEach((element: any) => {
        this.payloade.push({ "owner_id": this.userData?.data?.owner_id, "department_id": data.department_id, "send_approval_notification_to": element.manager_name })
      })
    })
    var temp = {
      "settings": this.payloade
    }

    this.masterService.addApproveNotification(temp).subscribe({
      next: (data: any) => {
        this.reset()
        this.handleSuccess("Added Successfully")
      }, error: (e: any) => {
        this.reset()
        this.handleError("server Error")
      }
    })
  }

  setupEdit() {
    this.manageAttendence.editApprovel.subscribe({
      next: (data: any) => {
        this._id = data.id
        var dept: any = []
        dept.push(data.department_id)
        var manager: any = []
        manager.push(data.send_approval_notification_to)
        this.approvalForm.get('department_name')?.patchValue(dept)
        this.approvalForm.get('add_approval_notification')?.patchValue(manager)
      }
    })
  }

  updateApprovalNotification() {
    var data1: any = []
    var data2: any
    data1 = this.approvalForm.get("department_name")?.value
    data2 = this.managerName
    data1.forEach((data: any) => {
      var temp = {
        "department_id": data
      }
      this.department.push(temp)
    })
    this.department.forEach((data: any) => {
      data2.forEach((element: any) => {
        this.payloade.push({ "department_id": data.department_id, "send_approval_notification_to": element.manager_name })
      })
    })
    var temp = {
      "_id": this._id,
      "setting": this.payloade[0]
    }
    console.log("temp==", temp)
    this.masterService.updateApproveNotification(temp).subscribe({
      next: (data: any) => {
        this.reset()
        this.handleSuccess("Update Successfully")
      }, error: (e: any) => {
        this.reset()
        this.handleError("server Error")
      }
    })
  }

  getManagerName() {
    // this.approvalForm.get("add_approval_notification")?.setValue('')
    var temp = {
      id: this.approvalForm.get("department_name")?.value
    }
    this.masterService.getDepartmentById(temp).subscribe({
      next: (res: any) => {
        console.log(res.department)
        res?.department.forEach((element: any) => {
          // let exestingManager = this.approvalForm.get("add_approval_notification")?.value

          // let managerName = ""

          // if (exestingManager != "") {
          //   managerName = exestingManager + '' + element.manager_data.first_name
          // } else {
          //   managerName = element.manager_data.first_name
          // }
          var temp = {
            "manager_name": element.manager_data.first_name
          }
          this.managerName.push(temp)
          // this.approvalForm.get("add_approval_notification")?.setValue(managerName)
        });
        // console.log("this.managerName", this.managerName)
        this.approvalForm.get("add_approval_notification")?.setValue(this.managerName)
      }, error: (e: any) => {
        console.log(e)
      }
    })
  }

  removeManagerName(event: any) {
    console.log("exestingManager", event.value.manager_data.first_name)
    let exestingManager = this.approvalForm.get("add_approval_notification")?.value
    let newManager: any = ''
    newManager = exestingManager?.replace(event.value.manager_data.first_name + ",", "")
    console.log("newManager", newManager)
    // this.approvalForm.get("send_absent_notification_to")?.setValue(newManager)
  }

}
