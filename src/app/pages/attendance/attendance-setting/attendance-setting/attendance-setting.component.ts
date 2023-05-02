import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';

@Component({
  selector: 'app-attendance-setting',
  templateUrl: './attendance-setting.component.html',
  styleUrls: ['./attendance-setting.component.scss']
})
export class AttendanceSettingComponent implements OnInit {
  color: any
  preferenceKeys = PreferenceKeys;
  userData: any;
  loader: boolean = false;
  count: any

  constructor(
    private fb: FormBuilder,
    private masterService: MasterServices,
    private appPreference: AppPreference

  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.count)
  }

  ngOnInit(): void {
    this.getProfile()
    // this.addItems()
    // this.addAttendenceSetting()
    this.getAttendenceSetting()
    console.log(this.count)
    // if (this.count === 0) {
    //   console.log("hello")
    //   this.addAttendenceSetting()
    // }

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

  myForm: FormGroup = this.fb.group({
    attendanceSetting: this.fb.array([])
  })

  get attendanceSettingForm(): any {
    return this.myForm.get('attendanceSetting') as FormArray
  }

  addItems() {
    const attendanceComponents: any = this.fb.group({
      title: [''],
      code: [''],
      color_code: ['']
    })
    this.attendanceSettingForm.push(attendanceComponents)
    this.attendanceSettingForm.disable()
  }

  getCollorCode(event: any) {
    this.color = event.value.color_code
  }

  addAttendenceSetting() {
    console.log("hello2")
    this.loader = true
    var temp = {
      "setting": [
        {
          "owner_id": this.userData?.data?.owner_id,
          "title": "Present",
          "code": "P",
          "color_code": "#3EB859"
        },
        {
          "owner_id": this.userData?.data?.owner_id,
          "title": "Absent",
          "code": "A",
          "color_code": "#C1121F"
        },
        {
          "owner_id": this.userData?.data?.owner_id,
          "title": "Weekend",
          "code": "W",
          "color_code": "#8338EC"
        },
        {
          "owner_id": this.userData?.data?.owner_id,
          "title": "Work On Weekend",
          "code": "WP",
          "color_code": "#560BAD"
        },
        {
          "owner_id": this.userData?.data?.owner_id,
          "title": "Holiday",
          "code": "H",
          "color_code": "#FFD60A"
        },
        {
          "owner_id": this.userData?.data?.owner_id,
          "title": "Work On Holiday",
          "code": "PH",
          "color_code": "#3EB859"
        },
        {
          "owner_id": this.userData?.data?.owner_id,
          "title": "Early Going",
          "code": "EG",
          "color_code": "#9E0059"
        },
        {
          "owner_id": this.userData?.data?.owner_id,
          "title": "Late Coming",
          "code": "LC",
          "color_code": "#FF0054"
        },
        {
          "owner_id": this.userData?.data?.owner_id,
          "title": "Travel",
          "code": "T",
          "color_code": "#006D77"
        }
      ]
    }

    this.masterService.addAttandenceSetting(temp).subscribe({
      next: (res: any) => {
        this.loader = false
        this.handleSuccess("Attendence Setting Added successfully")
        // this.getAttendenceSetting()
        // location.reload()

      },
      error: (err: any) => {
        if (err.message) {
          this.loader = false
          this.handleError('Server Error')
        }
      }
    })
  }

  getAttendenceSetting() {
    this.loader = true
    var temp = {
      "isDeleted": false,
      "owner_id": this.userData?.data?.owner_id,
      "limit": 100,
      "offset": 0
    }

    this.masterService.getSetting(temp).subscribe({
      next: (res: any) => {
        this.count = res.setting.count

        this.loader = false
        // this.attendanceSettingForm.push(res.setting.rows)
        res.setting.rows.forEach((data: any) => {
          const settingData = this.fb.group({
            _id: data.id,
            title: data.title,
            code: data.code,
            color_code: data.color_code
          })
          this.attendanceSettingForm.push(settingData)
        })
        this.attendanceSettingForm.disable()
        if (res.setting.count === 0) {
          console.log("hello")
          this.addAttendenceSetting()
        }
      },
      error: (err: any) => {
        if (err.message) {
          this.loader = false
          this.handleError('Server Error')
        }
      }
    })
  }

  index: any
  data: any
  openEdit(i: any, data: any) {
    this.index = i
    this.data = data._id
    if (this.attendanceSettingForm?.controls[i].disabled) {
      this.attendanceSettingForm?.controls[i].enable()
    } else {
      this.attendanceSettingForm?.controls[i].disable()
    }
  }

  updateSetting() {
    this.loader = true
    var temp = {
      "_id": this.data,
      "setting": {
        title: this.attendanceSettingForm.value[this.index].title,
        code: this.attendanceSettingForm.value[this.index].code,
        color_code: this.attendanceSettingForm.value[this.index].color_code
      }
    }
    console.log(temp)
    this.masterService.editSetting(temp).subscribe({
      next: (res: any) => {
        this.loader = false
        this.handleSuccess("Attendence Setting Update successfully")
        location.reload()
        // this.getAttendenceSetting()
      },
      error: (err: any) => {
        if (err.message) {
          this.loader = false
          this.handleError('Server Error')
        }
      }
    })
  }



  deleteSetting(i: any, data: any) {
    // console.log(this.attendanceSettingForm.length)
    // console.log(data)
    // this.attendanceSettingForm.removeAt(i)
    if (this.attendanceSettingForm.length == 0) {
      this.handleError("you can't delete this one ")
    } else {
      console.log(data)
      var temp = {
        "id": data._id,
        "isDeleted": true
      }
      console.log(temp)
      this.masterService.deleteSetting(temp).subscribe({
        next: (res: any) => {
          this.loader = false
          this.handleSuccess("Attendence Setting Delete successfully")
          // this.getAttendenceSetting()
          location.reload()
          this.attendanceSettingForm.removeAt(i)
        },
        error: (err: any) => {
          if (err.message) {
            this.loader = false
            this.handleError('Server Error')
          }
        }
      }
      )
    }
    this.loader = true

  }

  colorPicker(event: any) {
    console.log(this.color)
  }

}
