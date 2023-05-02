import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';

@Component({
  selector: 'app-attendance-notification',
  templateUrl: './attendance-notification.component.html',
  styleUrls: ['./attendance-notification.component.scss']
})
export class AttendanceNotificationComponent implements OnInit {

  preferenceKeys = PreferenceKeys;
  userData: any;
  user_data: any[] = []
  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference
  ) { }

  attendenceForm = new FormGroup({
    formName: new FormControl("attendenceForm"),
    require_approvel_of: new FormControl(""),
    send_approvel_notification_to: new FormControl(""),
    missing_attendence_notify_to: new FormControl(""),
    active_emp_absent_notification: new FormControl(""),
    notification_applies_to: new FormControl(""),
  })

  ngOnInit(): void {
    this.getProfile()
    this.getEmployee()
    this.getNotifySetting()
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
  }

  active_emp_absent_notification: any = [
    { "value": true, "data": "Yes" },
    { "value": false, "data": "No" }
  ]

  getEmployee() {
    var temp = {
      "isDeleted": false,
      "limit": 10000,
      "offset": 0,
      "user_owner_id": this.userData?.data?.owner_id,
      "isExitDetail": false
    }
    this.masterService.getEmployee(temp).subscribe({
      next: (res: any) => {
        this.user_data = res.employee.rows
      },
      error: (err: any) => {
        if (err.message) {
          this.handleError('Server Error')
        }

      }
    })
  }

  saveNotification() {
    console.log(this.attendenceForm.value)
    var temp = {
      "settings": {
        owner_id: this.userData?.data?.owner_id,
        require_approvel_of: this.attendenceForm.get("require_approvel_of")?.value || null,
        send_approvel_notification_to: this.attendenceForm.get("send_approvel_notification_to")?.value || null,
        missing_attendence_notify_to: this.attendenceForm.get("missing_attendence_notify_to")?.value || null,
        active_emp_absent_notification: this.attendenceForm.get("active_emp_absent_notification")?.value,
        notification_applies_to: this.attendenceForm.get("notification_applies_to")?.value || null,
      }
    }
    console.log(temp)
    this.masterService.addNotificationSetting(temp).subscribe({
      next: (res: any) => {
        this.handleSuccess("Setting Added successfully")
        this.getNotifySetting()
      },
      error: (err: any) => {
        this.handleError('Server Error')
      }
    })
  }
  _id: any
  attendenceData: any[] = []
  getNotifySetting() {
    var temp = {
      "owner_id": this.userData?.data?.owner_id
    }

    this.masterService.getNotifySetting(temp).subscribe({
      next: (res: any) => {
        this.attendenceData = res.attendance.rows[0]
        var data = res.attendance.rows[0]
        this._id = data?.id
        this.attendenceForm.patchValue({
          require_approvel_of: data?.require_approvel_of,
          send_approvel_notification_to: data?.send_approvel_notification_to,
          missing_attendence_notify_to: data?.missing_attendence_notify_to,
          active_emp_absent_notification: data?.active_emp_absent_notification,
          notification_applies_to: data?.notification_applies_to,
        })
        console.log(data)

      },
      error: (err: any) => {
        if (err.message) {
          this.handleError('Server Error')
        }

      }
    })
  }

  updateNotification() {
    var temp = {
      "_id": this._id,
      "updateSetting": {
        "require_approvel_of": this.attendenceForm.get("require_approvel_of")?.value,
        "send_approvel_notification_to": this.attendenceForm.get("send_approvel_notification_to")?.value,
        "missing_attendence_notify_to": this.attendenceForm.get("missing_attendence_notify_to")?.value,
        "active_emp_absent_notification": this.attendenceForm.get("active_emp_absent_notification")?.value,
        "notification_applies_to": this.attendenceForm.get("notification_applies_to")?.value,
      }
    }

    this.masterService.updateNotification(temp).subscribe({
      next: (res: any) => {
        this.handleSuccess("Setting Update successfully")
      },
      error: (err: any) => {
        console.log("hello")
        this.handleError('Server Error')
      }
    })
  }
}
