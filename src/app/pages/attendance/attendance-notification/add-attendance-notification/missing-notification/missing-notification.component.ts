import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { ManageAttendanceNotificationComponent } from '../../manage-attendance-notification/manage-attendance-notification.component';
import { TimeZone } from 'src/app/shared/config/timeZone'
declare var UIkit: any;

@Component({
  selector: 'app-missing-notification',
  templateUrl: './missing-notification.component.html',
  styleUrls: ['./missing-notification.component.scss']
})
export class MissingNotificationComponent implements OnInit {

  constructor(
    private formValidator: FormValidator,
    private masterService: MasterServices,
    private appPreference: AppPreference,
    private manageAttendence: ManageAttendanceNotificationComponent
  ) { }
  @Input('isEditMissing') isEditMissing: boolean = false;
  preferenceKeys = PreferenceKeys;
  userData: any;
  time_zone = TimeZone
  _id: any

  missingNotificationForm = new FormGroup({
    formName: new FormControl("missingNotificationForm"),
    Occurrence: new FormControl(""),
    when_to_send: new FormControl(""),
    TimeZone: new FormControl(""),
    starting_from: new FormControl(""),
    collect_attendance_data_for: new FormControl(""),
    Description: new FormControl(""),
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
  }

  Occurrence: any = [
    { "value": "Daily" },
    { "value": "Weekly" },
    { "value": "Monthly" },
    { "value": "Quarterly" },
    { "value": "Half Year" },
    { "value": "Yearly" }
  ]

  collectAttendanceFrom: any = [
    { "value": "Today" },
    { "value": "Yesterday" },
    { "value": "Last 14 days" },
    { "value": "Last 20 days" },
    { "value": "Last week" },
    { "value": "last 2 week" },
    { "value": "last 3 week" },
    { "value": "last month" },
    { "value": "last quarter" },
    { "value": "this week" },
    { "value": "this month" },
    { "value": "this year" },
    { "value": "this quarter" },
    { "value": "current attendance period" }
  ]

  reset() {
    this.isEditMissing = false
    this.missingNotificationForm.reset()
    this.manageAttendence.getMissingAttendence()
    UIkit.modal("#add-missing-notification").hide();
    // window.location.reload()
  }

  addMissingNotification() {
    var temp = {
      "settings": {
        "owner_id": this.userData?.data?.owner_id,
        "Occurrence": this.missingNotificationForm.get("Occurrence")?.value,
        "when_to_send": this.missingNotificationForm.get("when_to_send")?.value,
        "TimeZone": this.missingNotificationForm.get("TimeZone")?.value,
        "starting_from": this.missingNotificationForm.get("starting_from")?.value,
        "collect_attendance_data_for": this.missingNotificationForm.get("collect_attendance_data_for")?.value,
        "Description": this.missingNotificationForm.get("Description")?.value,
      }
    }
    this.masterService.addMissingAttendence(temp).subscribe({
      next: (res: any) => {
        this.handleSuccess("Added Successfully")
        this.reset()
      }, error: (e: any) => {
        this.handleError("Server Error")
      }
    })
  }

  setupEdit() {
    this.manageAttendence.editMissing.subscribe({
      next: (data: any) => {
        console.log(data)
        this._id = data.id
        this.isEditMissing = true
        this.missingNotificationForm.patchValue(data)
      }
    })
  }

  updateMissing() {
    var temp = {
      "_id": this._id,
      "settings": this.missingNotificationForm.value
    }
    this.masterService.updateMissingAttendence(temp).subscribe({
      next: (res: any) => {
        this.handleSuccess("Added Successfully")
        this.reset()
      }, error: (e: any) => {
        this.handleError("Server Error")
      }
    })
  }
}
