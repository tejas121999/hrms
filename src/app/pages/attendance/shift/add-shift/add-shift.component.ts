import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { ManageShiftComponent } from '../manage-shift/manage-shift.component';
declare var UIkit: any;

@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.scss']
})
export class AddShiftComponent implements OnInit {
  @Input('addItem') addItem: boolean = false
  @Input('isEdit') isEdit: boolean = false;
  // isEdit: any;
  days: String = "";
  buttonLoader: boolean = false;
  userData: any;
  id: any
  delete_shiftDays: any[] = []

  constructor(
    private formValidator: FormValidator,
    private fb: FormBuilder,
    private masterService: MasterServices,
    private appPreference: AppPreference,
    private manageShiftComponent: ManageShiftComponent
  ) { }

  shiftForm = new FormGroup({
    formName: new FormControl("shiftForm"),
    shift_name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    code: new FormControl(''),
    description: new FormControl(''),
    flexible_time: new FormControl(''),
    break_shift: new FormControl(''),
    start_time: new FormControl('', [Validators.required]),
    end_time: new FormControl('', [Validators.required]),
    half_day_time: new FormControl('', [Validators.required]),
    working_hrs_LT_half_day: new FormControl('', [Validators.required]),
    full_day_working_hrs: new FormControl('', [Validators.required]),
    late_mark_time: new FormControl('', [Validators.required]),
    break_time: new FormControl(''),
    week_days: new FormControl(''),
    off_days: new FormControl(''),

  })
  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }
  }

  ngOnInit(): void {
    this.getProfile()
    this.setupEdit();

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.addItem) {
      this.halfDayItems()
      this.fullDayItems();
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
  newHalfDay: any[] = []
  newFullDay: any[] = []
  i: number = 1
  add_Item: boolean = false

  getError(formGroup: FormGroup, controlName: any) {
    return this.formValidator.getErrorForControl(formGroup, controlName);
  }

  halfDayItems() {
    const shiftComponent: any = this.fb.group({
      day: "HD",
      week_days: [''],
      off_days: ['']
    })
    this.halfDayForm.push(shiftComponent)
    this.i = this.halfDayForm.value.length - 1
    this.add_Item = this.halfDayForm?.controls[this.i]?.value.week_days === ""
    // console.log(this.add_Item)
    // if (this.halfDayForm?.controls[this.i]?.value.week_days === "") {
    //   this.handleError("fill the data")
    // } else {

    // }
    if (this.isEdit) {
      var new_array = this.halfDayForm.value[this.halfDayForm.value.length - 1]
      console.log("new_array", new_array)
      // this.newHalfDay.push(new_array)
    }
  }

  fullDayItems() {
    console.log("hello2")
    const fullDayComponet: any = this.fb.group({
      day: "FD",
      week_days: [''],
      off_days: ['']
    })
    this.fullDayForm.push(fullDayComponet)
    this.i = this.fullDayForm.value.length - 1
    this.add_Item = this.fullDayForm?.controls[this.i]?.value?.week_days === ""
    if (this.isEdit) {
      var new_array = this.fullDayForm.value[this.fullDayForm.value.length - 1]
      this.newFullDay.push(new_array)
    }
  }

  removeItem(i: any, data: any) {
    console.log(data?.value?.shift_id)
    if (this.halfDayForm?.controls.length > 1) {
      this.delete_shiftDays.push({ "id": data?.value?.shift_id })
      this.halfDayForm.removeAt(i)
    } else {
      this.handleError("You will be unable to delete this row")
    }
  }

  removeFdItem(i: any, data: any) {
    if (this.fullDayForm.controls.length > 1) {
      this.delete_shiftDays.push({ "id": data?.value?.shift_id })
      this.fullDayForm.removeAt(i)
    } else {
      this.handleError("You will be unable to delete this row")
    }
  }
  week_days = [
    { name: "Sunday" },
    { name: "Monday" },
    { name: "Tuesday" },
    { name: "Wednesday" },
    { name: "Thursday" },
    { name: "Friday" },
    { name: "Saturday" }
  ]

  off_days = [
    { name: "1" },
    { name: "2" },
    { name: "3" },
    { name: "4" },
    { name: "5" },
    { name: "All" }
  ]


  fullDayEdit(i: any) {
    if (this.fullDayForm.controls[i].disabled) {
      this.fullDayForm.controls[i].enable()
    } else {
      this.fullDayForm.controls[i].disable()
    }
  }
  addShift() {
    if (this.shiftForm.invalid) {
      this.shiftForm.markAllAsTouched()
    } else {
      let shift_days = [...this.halfDayForm.value, ...this.fullDayForm.value]
      var temp = {
        "shiftData": {
          "shift_owner_id": this.userData?.data?.owner_id,
          "shift_name": this.shiftForm.get('shift_name')?.value,
          "start_time": this.shiftForm.get('start_time')?.value,
          "end_time": this.shiftForm.get('end_time')?.value,
          "full_day_working_hrs": this.shiftForm.get('full_day_working_hrs')?.value,
          "half_day_working_hrs": this.shiftForm.get('half_day_working_hrs')?.value,
          "working_hours_ot_rate": this.shiftForm.get('working_hours_ot_rate')?.value,
          "late_mark_time": this.shiftForm.get('late_mark_time')?.value,
          "half_day_time": this.shiftForm.get('half_day_time')?.value,
          "working_hrs_LT_half_day": this.shiftForm.get('working_hrs_LT_half_day')?.value,
        },
        "shiftGeneral": {
          "code": this.shiftForm.get('code')?.value,
          "description": this.shiftForm.get('description')?.value,
          "flexible_time": this.shiftForm.get('flexible_time')?.value,
          "break_shift": this.shiftForm.get('break_shift')?.value,
          "break_time": this.shiftForm.get('break_time')?.value,
        },
        "shift_days": shift_days
      }
      this.masterService.add_shift(temp).subscribe({
        next: (res: any) => {
          this.buttonLoader = false
          this.handleSuccess("Shift added Successfully")
          this.reset()
        }, error: (e: any) => {
          this.handleError(e)
        }
      })
    }
  }

  editShift() {
    console.log("edit====", this.week_days)
    let shift_days: any = [...this.halfDayForm.value, ...this.fullDayForm.value]
    let new_data: any = []
    shift_days.forEach((data: any) => {
      if (data?.shift_id === undefined) {
        new_data.push(data)
      }
    })

    let temp = {
      "shiftData": {
        "id": this.id,
        "shift_name": this.shiftForm.get('shift_name')?.value,
        "start_time": this.shiftForm.get('start_time')?.value,
        "end_time": this.shiftForm.get('end_time')?.value,
        "full_day_working_hrs": this.shiftForm.get('full_day_working_hrs')?.value,
        "half_day_working_hrs": this.shiftForm.get('half_day_working_hrs')?.value,
        "working_hours_ot_rate": this.shiftForm.get('working_hours_ot_rate')?.value,
        "late_mark_time": this.shiftForm.get('late_mark_time')?.value,
        "half_day_time": this.shiftForm.get('half_day_time')?.value,
        "working_hrs_LT_half_day": this.shiftForm.get('working_hrs_LT_half_day')?.value,

      },
      "shiftGeneral": {
        "shift_id": this.id,
        "code": this.shiftForm.get('code')?.value,
        "description": this.shiftForm.get('description')?.value,
        "flexible_time": this.shiftForm.get('flexible_time')?.value,
        "break_shift": this.shiftForm.get('break_shift')?.value,
        "break_time": this.shiftForm.get('break_time')?.value,
      },
      "shift_days": new_data,
      "delete_shiftDays": this.delete_shiftDays
    }
    console.log("temp", temp)
    this.masterService.Edit_shift(temp).subscribe({
      next: (res: any) => {
        this.buttonLoader = false
        this.handleSuccess("Shift updated Successfully")
        this.reset()
      }, error: (e: any) => {
        //    shift_days=[]
        this.handleError(e)
      }
    })
  }
  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }
  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }
  currentTab(day: any) {
    console.log(day)
    if (day == 1) {
      this.days = "HD"
    } else if (day == 2) {
      this.days = "FD"
    }
  }
  halfDayEdit(i: any, data: any) {
    console.log(data.value)
    if (this.halfDayForm.controls[i].disabled) {
      this.halfDayForm.controls[i].enable()
    } else {
      this.halfDayForm.controls[i].disable()
    }
  }
  week_day: any
  removeWeekDays(event: any) {
    this.week_day = event.name
  }
  removeDays(event: any) {
    this.add_Item = false
    if (event.name === "All") {
      const i: any = this.week_days.findIndex((obj: any) => obj.name === this.week_day)
      // const index: any = this.off_days.findIndex((obj: any) => obj.name === event.name)
      if (i !== -1) {
        // this.off_days.splice(index, 1)S
        this.week_days.splice(i, 1)
      }
      console.log(this.off_days)
      console.log(this.week_days)
    }
  }

  setupEdit() {
    this.manageShiftComponent.editData.subscribe({
      next: (data: any) => {
        this.id = data.id
        // this.shiftForm.get('shift_name')?.patchValue(data.shift_name),
        // this.shiftForm.get('code')?.patchValue(data.code),
        // this.shiftForm.get('description')?.patchValue(data.description),
        // this.shiftForm.get('flexible_time')?.patchValue(data.flexible_time),
        // this.shiftForm.get('break_shift')?.patchValue(data.break_shift),
        // this.shiftForm.get('start_time')?.patchValue(data.start_time),
        // this.shiftForm.get('end_time')?.patchValue(data.end_time),
        // this.shiftForm.get('half_day_time')?.patchValue(data.half_day_time),
        // this.shiftForm.get('working_hrs_LT_half_day')?.patchValue(data.working_hrs_LT_half_day),
        // this.shiftForm.get('full_day_working_hrs')?.patchValue(data.full_day_working_hrs),
        // this.shiftForm.get('late_mark_time')?.patchValue(data.late_mark_time),
        // this.shiftForm.get('break_time')?.patchValue(data.break_time),
        this.shiftForm.patchValue({
          shift_name: data?.shift_name,
          code: data?.ShiftMetaDatum?.code,
          description: data?.ShiftMetaDatum?.description,
          flexible_time: data?.ShiftMetaDatum?.flexible_time,
          break_shift: data?.ShiftMetaDatum?.break_shift,
          start_time: data?.start_time,

          end_time: data?.end_time,
          half_day_time: data?.half_day_time,
          working_hrs_LT_half_day: data?.working_hrs_LT_half_day,
          full_day_working_hrs: data?.full_day_working_hrs,
          late_mark_time: data?.late_mark_time,
          break_time: data?.ShiftMetaDatum?.break_time,
        })
        console.log("setupedit", data)
        var temp1 = {
          "shift_id": data.id
        }
        this.masterService.fullDay(temp1).subscribe({
          next: (res: any) => {
            console.log(res.days.length)
            res.days.forEach((data: any) => {
              // const index: any = this.week_days.findIndex((obj: any) => obj.name === data.week_days)
              // if (index !== -1) {
              //   this.week_days.splice(index, 1)
              // }
              const column = this.fb.group({
                shift_id: data.id,
                day: data.day,
                week_days: data.week_days,
                off_days: data.off_days
              })
              this.fullDayForm.push(column)
              // this.newFullDay.push(column.value)
              this.fullDayForm.disable()
            })
          }
        })

        var temp2 = {
          "shift_id": data.id
        }
        console.log(temp2)
        this.masterService.haldDay(temp2).subscribe({
          next: (res: any) => {
            console.log(res.days.length)
            res.days.forEach((data: any) => {
              // const index: any = this.week_days.findIndex((obj: any) => obj.name === data.week_days)
              // if (index !== -1) {
              //   this.week_days.splice(index, 1)
              // }
              const column = this.fb.group({
                "shift_id": data.id,
                day: data.day,
                week_days: data.week_days,
                off_days: data.off_days
              })
              this.halfDayForm.push(column)
              // this.newHalfDay.push(column.value)
              this.halfDayForm.disable()
            })

          }
        })
        // this.getDays()
        this.isEdit = true
      }, error: (e: any) => {
        this.handleError(e);
        this.reset()
      }
    })
  }


  // getOneShift() {
  //   var temp = {
  //     "id": this.id
  //   }
  //   this.masterService.getOnePackage(temp).subscribe({
  //     next: (res: any) => {
  //       res.components.forEach((data: any) => {
  //         this.editPackageID = data?.scip_id
  //         this.deletePackageID = data?._id
  //         const column = this.fb.group({
  //           _id: data._id,
  //           salary_component_name: data?.scip_id,
  //           type: data?.type,
  //           value: data?.value,
  //           actual: data?.actual,
  //           deduction: data?.deduction,
  //           monthly_value: data?.monthly_value,
  //           yearly_value: data?.yearly_value
  //         })
  //         this.anualPackageForm.push(column)
  //         this.anualPackageForm.disable()
  //       })
  //       res.leaves.forEach((data: any) => {
  //         this.leaveDeleteId = data?.lip_id
  //         const leave = this.fb.group({
  //           lip_id: data?.lip_id,
  //           leave_id: data?.id,
  //           number_days: data?.no_of_days
  //         })
  //         this.leavePackageForm.push(leave)
  //       })
  //     }, error: (e: any) => {
  //       this.handleError("error")
  //     }
  //   })
  // }
  reset() {
    this.isEdit = false
    this.addItem = false
    this.manageShiftComponent.getShift();
    this.shiftForm.reset();
    this.halfDayForm.clear()
    this.fullDayForm.clear()
    UIkit.modal("#add-shift").hide()
  }
}
