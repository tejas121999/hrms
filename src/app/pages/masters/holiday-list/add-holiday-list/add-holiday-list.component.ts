import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { ManageHolidayListComponent } from '../manage-holiday-list/manage-holiday-list.component';
declare var UIkit: any;
import * as moment from "moment";
@Component({
  selector: 'app-add-holiday-list',
  templateUrl: './add-holiday-list.component.html',
  styleUrls: ['./add-holiday-list.component.scss']
})
export class AddHolidayListComponent implements OnInit {

  constructor(
    private formValidator: FormValidator,
    private masterService: MasterServices,
    private appPreference: AppPreference,
    private holidayComponent: ManageHolidayListComponent
  ) { }
  @Input('isEdit') isEdit: boolean = false;
  @Input() bankData: any;
  holidayId: any
  userData: any;
  disablebtn = false;
  buttonLoader: boolean = false;
  preferenceKeys = PreferenceKeys;

  holidaylistForm = new FormGroup({
    formName: new FormControl("holidaylistForm"),
    holiday_name: new FormControl('', [Validators.required, Validators.maxLength(150)]),
    date: new FormControl(''),
    holiday_day: new FormControl('null')
  })

  ngOnInit(): void {
    this.setupEdit()
    this.getProfile()
  }

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }
  }

  setupEdit() {
    this.holidayComponent.editData.subscribe({
      next: (data) => {
        this.isEdit = true,
          this.holidayId = data.id,
          this.holidaylistForm.get('holiday_name')?.patchValue(data.holiday_name),
          this.holidaylistForm.get('date')?.patchValue(data.holiday_date),
          this.holidaylistForm.get('holiday_day')?.patchValue(data.holiday_day)
      }, error: (e: any) => {
        this.handleError(e)
        this.reset()
      }
    })
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
    this.holidayComponent.getHolidayList();
  }
  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  addHolidaylist() {
    this.buttonLoader = true;
    if (this.holidaylistForm.invalid) {
      this.holidaylistForm.markAllAsTouched()
      this.buttonLoader = false;
    } else {
      this.disablebtn = true
      this.buttonLoader = true
      console.log(this.holidaylistForm)
      var holiday_date = moment(this.holidaylistForm.get('date')?.value).add(1, 'days').format("YYYY/MM/DD")
      var temp = {
        "holidayPayload": {
          "holiday_owner_id": this.userData?.data?.owner_id,
          "holiday_name": this.holidaylistForm.get('holiday_name')?.value,
          "holiday_date": holiday_date,
          "holiday_day": this.holidaylistForm.get('holiday_day')?.value,
        },
        "generalPayload": null,
        "departmentPayload": [],
        "employeePayload": []
      }

      console.log("temp===", temp)
      this.masterService.addHoliday(temp).subscribe({
        next: (res) => {
          this.handleSuccess("Holiday Add Successfully")
          this.reset()
          this.buttonLoader = false
          this.disablebtn = false
        }, error: (e: any) => {
          this.handleError(e.error)
          this.buttonLoader = false;
          this.disablebtn = false
        }
      })
    }
  }

  updateHoliday() {
    if (this.holidaylistForm.invalid) {
      this.holidaylistForm.markAllAsTouched()
      this.buttonLoader = false;
    } else {
      var holiday_date = moment(this.holidaylistForm.get('date')?.value).add(1, 'days').format("YYYY/MM/DD")
      var temp = {
        "holidayPayload": {
          "id": this.holidayId,
          "holiday_name": this.holidaylistForm.get('holiday_name')?.value,
          "holiday_date": holiday_date,
          "holiday_day": this.holidaylistForm.get('holiday_day')?.value,
        },
        "generalPayload": null,
        "departmentPayload": [],
        "employeePayload": []
      }
      this.masterService.updateHoliday(temp).subscribe({
        next: (res) => {
          this.handleSuccess("Holiday Update Successfully")
          this.reset()
        }, error: (e: any) => {
          this.handleError(e)
        }
      })
    }
  }

  reset() {
    this.isEdit = false;
    this.holidaylistForm.reset()
    // window.location.reload()
    this.holidaylistForm.patchValue({
      "formName": "holidaylistForm"
    })
    UIkit.modal("#add-holiday-list").hide();
    this.holidayComponent.getHolidayList()
  }

  getError(formGroup: FormGroup, controlName: any) {
    return this.formValidator.getErrorForControl(formGroup, controlName);
  }

}
