import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
// import { Moment } from 'moment';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { ManageRosterComponent } from '../manage-roster/manage-roster.component';
declare var UIkit: any;

@Component({
  selector: 'app-add-roster',
  templateUrl: './add-roster.component.html',
  styleUrls: ['./add-roster.component.scss']
})
export class AddRosterComponent implements OnInit {
  @Input('isEdit') isEdit: boolean = false;
  designationData: any = []
  buttonLoader = false;
  userData: any;
  years: any
  oncrewId: number = 0
  offcrewfetchData: any = [];
  tabletoggle = true
  matchdes = false
  crewData: any = [];
  mainCrewData: any = [];
  repCrewData: any = []
  repcrewname: any
  comboCrewData: any = []
  onCrewName: any;
  offCrewName: any;

  employeeData: any = []
  constructor(
    private formValidator: FormValidator,
    private fb: FormBuilder,
    private manageRosterComponent: ManageRosterComponent,
    private appPreference: AppPreference,
    private masterService: MasterServices,

  ) { }

  ngOnInit(): void {
    this.getProfile()
    this.rosterDataItems();
    this.getDesignation();
    this.getEmployee();
    this.getCrewData();
  }

  fyears = [
    { name: "2022-2023" },
    { name: "2023-2024" },
    { name: "2024-2025" },
    { name: "2025-2026" },
    { name: "2026-2027" },
    { name: "2027-2028" },
    { name: "2028-2029" },
    { name: "2029-2030" },
    { name: "2030-2031" },
    { name: "2031-2032" },
    { name: "2032-2033" },
  ]

  Rosterforms = new FormGroup({
    formName: new FormControl("Rosterforms"),
    year: new FormControl(''),
    crew_name: new FormControl(''),
    main_date: new FormControl(''),
    replace_date: new FormControl(''),
    replace_crew_name: new FormControl(''),
  })

  rosterForm: FormGroup = this.fb.group({
    rosterData: this.fb.array([])
  })

  get rosterDataForm() {
    return this.rosterForm.get('rosterData') as FormArray
  }

  rosterDataItems() {
    const rosterComponent: any = this.fb.group({
      designation: [''],
      emp_1: [''],
      emp_2: ['']
    })
    this.rosterDataForm.push(rosterComponent)

  }
  getEmployee() {
    // this.loader = true
    var temp = {
      "isDeleted": false,
      "limit": 1000,
      "offset": 0,
      "user_owner_id": this.userData?.data?.owner_id,
      "isExitDetail": false
    }
    this.masterService.getEmployee(temp).subscribe({
      next: (res: any) => {
        this.employeeData = res.employee.rows
        // console.log(res)
        // this.count = res.employee.count
        // this.setData(res.employee.rows)
        // this.loader = false
      }
    })
  }

  delete_shiftDays: any[] = []
  removeItem(i: any, data: any) {
    console.log(data)
    console.log("data==", data.value.id)

    console.log("this.delete_shiftDays", this.delete_shiftDays)
    if (this.rosterDataForm?.controls.length > 1) {
      this.delete_shiftDays.push({ "id": data.value.id })
      this.rosterDataForm.removeAt(i)
    } else {
      this.handleError("You Can't Delete 1st Row")
    }
  }

  getProfile() {
    this.userData = {
      designation: this.appPreference.getObject(PreferenceKeys.DESIGNATION),
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO),
    }
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  getDesignation() {
    var temp = {
      "isDeleted": false,
      "limit": 1000,
      "offset": 0,
      "designation_owner_id": this.userData?.data?.owner_id
    }
    this.masterService.getDesignation(temp).subscribe({
      next: (res: any) => {
        this.designationData = res.designation.rows
      },
      error: (err: any) => {
        this.handleError('Server Error')
      }
    })
  }

  getonCrewDatas(e: any) {
    this.tabletoggle = true
    this.matchdes = false
    this.repcrewname = ''
    this.oncrewId = e.id

    console.log("eeeeeeeeee", e)
    let maintemp =
    {
      "crew_id": this.oncrewId
    }
    this.masterService.getonCrewData(maintemp).subscribe({
      next: (res: any) => {
        this.mainCrewData = res.crewEmployees
        console.log("crew employee", res)
        this.onCrewName = res.crew.crew_name
      }
    })
    var data: any = []
    this.crewData.forEach((element: any) => {
      if (element.id != this.oncrewId) {
        data.push(element)

      } else {
      }
    });
    if (data != null) {
      setTimeout(() => {
        console.log("offcrewname====", data)
        this.offcrewfetchData = data;
        // this.offCrewName = data

      }, 200);
    }
  }

  getRepCrewData(e: any) {
    console.log(e.crew_name)
    this.offCrewName = e.crew_name
    let reptemp =
    {
      "crew_id": e.id
    }
    this.masterService.getoffCrewData(reptemp).subscribe({
      next: (res: any) => {
        this.repCrewData = res.crewEmployees
        this.tabletoggle = false
        this.comboCrewData = []
        this.mainCrewData.forEach((main: any) => {
          this.repCrewData.forEach((rep: any) => {
            if (main.designation_id == rep.designation_id || null) {
            } else {
              this.matchdes = true
              return
            }
            this.comboCrewData.push({ "mainDes": main.job_title, "mainEmp": main.emp_name, "repDes": rep.job_title, "repEmp": rep.emp_name })
          });
        });
        console.log(this.comboCrewData);
      }
    })
  }

  getCrewData() {
    let temp = {
      "owner_id": this.userData?.data?.owner_id,
    }
    this.masterService.getCrew(temp).subscribe({
      next: (res: any) => {
        this.crewData = res.crew.rows;
        console.log("crew Data", res)
      }
    })
  }

  reset() {
    this.Rosterforms.reset()
    UIkit.modal("#add-roster").hide();
    this.manageRosterComponent.getRoster()
    this.tabletoggle = true
  }

  addRoster() {
    console.log(this.rosterDataForm.value);
    var startDate: any = moment(this.Rosterforms.get('main_date')?.value).format("YYYY-MM-DD");
    var endDate: any = moment(this.Rosterforms.get('replace_date')?.value).format("YYYY-MM-DD");
    // if (this.matchdes == true) {
    //   return
    // }
    // else {
    let temp = {
      "roster": {
        "on_crew_year": this.Rosterforms.get('year')?.value,
        "on_crew_id": this.Rosterforms.get('crew_name')?.value,
        "on_crew_date": startDate,
        "off_crew_date": endDate,
        "off_crew_id": this.Rosterforms.get('replace_crew_name')?.value,
        "sign_on_crew_name": this.onCrewName,
        "sign_off_crew_name": this.offCrewName
        // "rosterData": this.rosterDataForm.value
      }
    }
    console.log("Added value", temp);
    // return

    this.masterService.addRoster(temp).subscribe({
      next: (res: any) => {
        this.manageRosterComponent.getRoster()
        this.handleSuccess("Roster Added Successfully")
        this.reset()
      }, error: (e: any) => {
        this.handleError('error');
      }
    })
    // }
  }

  updateroster() {

  }

  getError(formGroup: FormGroup, controlName: any) {
    console.log(formGroup, controlName)
    return this.formValidator.getErrorForControl(formGroup, controlName);
  }

}
