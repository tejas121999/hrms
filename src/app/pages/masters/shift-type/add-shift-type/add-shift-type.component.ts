import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { ManageShiftTypeComponent } from '../manage-shift-type/manage-shift-type.component';
declare var UIkit: any;

@Component({
  selector: 'app-add-shift-type',
  templateUrl: './add-shift-type.component.html',
  styleUrls: ['./add-shift-type.component.scss']
})
export class AddShiftTypeComponent implements OnInit {

  constructor(
    private formValidator: FormValidator,
    private fb: FormBuilder,
    private masterService: MasterServices,
    private appPreference: AppPreference,
    private manageShiftComponent: ManageShiftTypeComponent
  ) { }

  @Input('isEdit') isEdit: boolean = false;
  @Input('addItem') addItem: boolean = false
  @Input() bankData: any;
  shiftId: any
  userData: any;
  preferenceKeys = PreferenceKeys;
  disabledbutton = false
  buttonLoader: boolean = false;
  addNewData: any[] = []
  i: any

  shifttypeForm = new FormGroup({
    formName: new FormControl("shifttypeForm"),
    shift_name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    start_time: new FormControl('', [Validators.required]),
    end_time: new FormControl('', [Validators.required]),
    full_day_working_hrs: new FormControl('', [Validators.required]),
    half_day_working_hrs: new FormControl('', [Validators.required]),
    working_hours_ot_rate: new FormControl('', [Validators.required]),
    late_mark_time: new FormControl(''),
    half_day_time: new FormControl('', [Validators.required]),
    week_days: new FormControl(''),
    off_days: new FormControl(''),
    working_hrs_LT_half_day: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
    this.setupEdit()
    this.getProfile()
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("this.isEdit", this.isEdit)
    if (!this.isEdit) {
      // this.halfDayItems()
      // this.fullDayItems()
    }
  }

  hdForm: FormGroup = this.fb.group({
    halfDay: this.fb.array([])
  })

  fdForm: FormGroup = this.fb.group({
    fullDay: this.fb.array([])
  })

  get halfDayForm() {
    return this.hdForm.get('halfDay') as FormArray
  }

  get fullDayForm() {
    return this.fdForm.get('fullDay') as FormArray
  }
  halfDayItems() {
    const shiftComponent: any = this.fb.group({
      day: "HD",
      week_days: [''],
      off_days: ['']
    })
    this.halfDayForm.push(shiftComponent)
  }

  fullDayItems() {
    const fullDayComponet: any = this.fb.group({
      day: "FD",
      week_days: [''],
      off_days: ['']
    })
    this.fullDayForm.push(fullDayComponet)
  }
  delete_shiftDays: any[] = []
  removeItem(i: any, data: any) {
    console.log(data)
    console.log("data==", data.value.id)

    console.log("this.delete_shiftDays", this.delete_shiftDays)
    if (this.halfDayForm?.controls.length > 1) {
      this.delete_shiftDays.push({ "id": data.value.id })
      this.halfDayForm.removeAt(i)
    } else {
      this.handleError("You Can't Delete 1st Row")
    }

  }

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }
  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }
  isValid: boolean = false

  addShiftType() {

    this.buttonLoader = true;
    if (this.shifttypeForm.invalid) {
      console.log(this.shifttypeForm.invalid)
      this.shifttypeForm.markAllAsTouched()
      this.buttonLoader = false;
    } else {
      this.disabledbutton = true;
      this.buttonLoader = true;
      var shift_days = [...this.halfDayForm.value, ...this.fullDayForm.value]
      var temp = {
        "shiftData": {
          "shift_owner_id": this.userData.data.owner_id,
          "shift_name": this.shifttypeForm.get('shift_name')?.value,
          "start_time": this.shifttypeForm.get('start_time')?.value || null,
          "end_time": this.shifttypeForm.get('end_time')?.value || null,
          "full_day_working_hrs": this.shifttypeForm.get('full_day_working_hrs')?.value,
          "half_day_working_hrs": this.shifttypeForm.get('half_day_working_hrs')?.value,
          "working_hours_ot_rate": this.shifttypeForm.get('working_hours_ot_rate')?.value,
          "late_mark_time": this.shifttypeForm.get('late_mark_time')?.value || null,
          "half_day_time": this.shifttypeForm.get('half_day_time')?.value || null,
          "working_hrs_LT_half_day": this.shifttypeForm.get('working_hrs_LT_half_day')?.value,
          "week_days": this.shifttypeForm.get('week_days')?.value,
          "off_days": this.shifttypeForm.get('off_days')?.value,
        },
        "shift_days": shift_days
      }
      this.masterService.addShift(temp).subscribe({
        next: (res) => {
          this.handleSuccess("Shift Details Added Successfully")
          this.reset()
          this.disabledbutton = false
          this.buttonLoader = false
        }, error: (e: any) => {
          this.handleError(e)
          this.disabledbutton = false
        }
      })
    }
  }

  updateShifType() {
    this.buttonLoader = true
    var shift_days = [...this.halfDayForm.value, ...this.fullDayForm.value]

    var temp = {
      "shiftData": {
        "id": this.shiftId,
        "shift_name": this.shifttypeForm.get('shift_name')?.value,
        "start_time": this.shifttypeForm.get('start_time')?.value,
        "end_time": this.shifttypeForm.get('end_time')?.value,
        "full_day_working_hrs": this.shifttypeForm.get('full_day_working_hrs')?.value,
        "half_day_working_hrs": this.shifttypeForm.get('half_day_working_hrs')?.value,
        "working_hours_ot_rate": this.shifttypeForm.get('working_hours_ot_rate')?.value,
        "late_mark_time": this.shifttypeForm.get('late_mark_time')?.value,
        "half_day_time": this.shifttypeForm.get('half_day_time')?.value,
        "working_hrs_LT_half_day": this.shifttypeForm.get('working_hrs_LT_half_day')?.value,
        "week_days": this.shifttypeForm.get('week_days')?.value,
        "off_days": this.shifttypeForm.get('off_days')?.value,
      },
      "shift_days": shift_days,
      "delete_shiftDays": this.delete_shiftDays
    }
    console.log("temp=========",temp)
    this.masterService.updateShift(temp).subscribe({
      next: (res) => {
        this.buttonLoader = false
        this.handleSuccess("Shift Details Updated Successfully")
        this.reset()
      }, error: (e: any) => {
        this.handleError(e)
      }
    })
  }

  halfDayEdit(i: any, data: any) {
    console.log(data.value)
    if (this.halfDayForm.controls[i].disabled) {
      this.halfDayForm.controls[i].enable()
    } else {
      this.halfDayForm.controls[i].disable()
    }
  }

  fullDayEdit(i: any) {
    if (this.fullDayForm.controls[i].disabled) {
      this.fullDayForm.controls[i].enable()
    } else {
      this.fullDayForm.controls[i].disable()
    }
  }

  setupEdit() {
    this.manageShiftComponent.editData.subscribe({
      next: (data) => {
        this.isEdit = true,
          console.log(data),
          this.shiftId = data.id,
          this.shifttypeForm.get('shift_name')?.patchValue(data.shift_name),
          this.shifttypeForm.get('start_time')?.patchValue(data.start_time),
          this.shifttypeForm.get('end_time')?.patchValue(data.end_time),
          this.shifttypeForm.get('full_day_working_hrs')?.patchValue(data.full_day_working_hrs),
          this.shifttypeForm.get('half_day_working_hrs')?.patchValue(data.half_day_working_hrs),
          this.shifttypeForm.get('working_hours_ot_rate')?.patchValue(data.working_hours_ot_rate),
          this.shifttypeForm.get('late_mark_time')?.patchValue(data.late_mark_time),
          this.shifttypeForm.get('half_day_time')?.patchValue(data.half_day_time),
          this.shifttypeForm.get('working_hrs_LT_half_day')?.patchValue(data.working_hrs_LT_half_day)
        var temp1 = {
          "shift_id": data.id
        }
        this.masterService.fullDay(temp1).subscribe({
          next: (res: any) => {
            res.days.forEach((data: any) => {
              const column = this.fb.group({
                id: data.id,
                day: data.day,
                week_days: data.week_days,
                off_days: data.off_days
              })

              this.fullDayForm.push(column)
              this.fullDayForm.disable()
            })
          }
        })

        var temp2 = {
          "shift_id": data.id
        }
        this.masterService.haldDay(temp2).subscribe({
          next: (res: any) => {
            console.log("hd", res.days)
            res.days.forEach((data: any) => {
              const column = this.fb.group({
                id: data.id,
                day: data.day,
                week_days: data.week_days,
                off_days: data.off_days
              })
              this.halfDayForm.push(column)
              this.halfDayForm.disable()
            })
          }
        })


      }, error: (e: any) => {
        this.handleError(e)
        this.reset()
      }
    })
  }

  days: String = "";
  currentTab(day: any) {
    console.log(day)
    if (day == 1) {
      this.days = "HD"
    } else if (day == 2) {
      this.days = "FD"
    }
  }
  getDays() {
    var temp = {
      "shift_id": this.shiftId,
      "day": this.days
    }
    this.masterService.fullDay(temp).subscribe({
      next: (res: any) => {
        console.log("=======", res)
      }
    })
  }

  week_days=[
    {name : "Sunday"},
    {name : "Monday"},
    {name : "Tuesday"},
    {name : "Wednesday"},
    {name : "Thursday"},
    {name : "Friday"},
    {name : "Saturday"}
  ]

  off_days=[
    {name : "All"},
    {name : "1"},
    {name : "2"},
    {name : "3"},
    {name : "4"},
    {name : "5"}
  ]


  reset() {
    this.isEdit = false;
    this.shifttypeForm.reset()
    this.halfDayForm.reset()
    this.fullDayForm.reset()
    this.shifttypeForm.patchValue({
      "formName": "shifttypeForm"
    })
    UIkit.modal("#add-shift-type").hide();
    this.manageShiftComponent.getShift()
  }

  getError(formGroup: FormGroup, controlName: any) {
    return this.formValidator.getErrorForControl(formGroup, controlName);
  }

}
