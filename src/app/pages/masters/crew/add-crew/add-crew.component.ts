import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { ManageCrewComponent } from '../manage-crew/manage-crew.component';
declare var UIkit: any;
@Component({
  selector: 'app-add-crew',
  templateUrl: './add-crew.component.html',
  styleUrls: ['./add-crew.component.scss']
})
export class AddCrewComponent implements OnInit {
  delete_crewdata: any[] = []
  crew_Form!: FormGroup
  userData: any;
  designation_data: any[] = []
  employee_data: any[] = []
  @Input('isEdit') isEdit: boolean = false;
  constructor(
    private fb: FormBuilder,
    private appPreference: AppPreference,
    private formValidator: FormValidator,
    private masterService: MasterServices,
    private manageCrew: ManageCrewComponent
  ) {
    this.initializeForm();
  }
  initializeForm() {
    this.crew_Form = this.fb.group({
      formName: new FormControl("crew_Form"),
      crew_name: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.getProfile()
  }

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }
    this.getDesignation()
  }
  crewForm: FormGroup = this.fb.group({
    crewArray: this.fb.array([])
  })

  get crewDataForm() {
    return this.crewForm.get('crewArray') as FormArray
  }

  crewData() {
    const crewDataComponent: any = this.fb.group({
      designation_id: [''],
      employee_id: ['']
    })
    this.crewDataForm.push(crewDataComponent)
  }
  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }
  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }
  removeFdItem(i: any, data: any) {
    // if (this.crewDataForm.controls.length > 1) {
    this.delete_crewdata.push({})
    this.crewDataForm.removeAt(i)
    // } else {
    //   this.handleError("You will be unable to delete this row")
    // }
  }
  designation = [
    { id: 1, name: 'a' },
    { id: 2, name: 'b' },
  ];
  employee = [
    { id: 1, name: 'a' },
    { id: 2, name: 'b' },
  ];

  reset() {
    UIkit.modal("#add-crew").hide();
    this.crew_Form.reset()
    this.crewDataForm.reset()
    this.manageCrew.getCrew()
  }

  getDesignation() {
    var temp = {
      "isDeleted": false,
      "designation_owner_id": this.userData?.data?.owner_id,
      "limit": 1000,
      "offset": 0
    }
    this.masterService.getDesignation(temp).subscribe({
      next: (res: any) => {
        this.designation_data = res.designation.rows
        console.log(res)
      }, error: (e: any) => {
        this.handleError("Server Error")
      }
    })
  }

  getEmpByDesignation(id: any) {
    var temp = {
      "designation_id": id.id
    }
    this.masterService.getEmpByDesignation(temp).subscribe({
      next: (res: any) => {
        this.employee_data = res.data
        console.log(res)
      }, error: (e: any) => {
        this.handleError("Server Error")
      }
    })
  }


  addCrew() {
    var temp = {
      "crew": {
        "crew_name": this.crew_Form.get('crew_name')?.value,
        "owner_id": this.userData?.data?.owner_id
      },
      "crewEmp": this.crewDataForm.value
    }
    this.masterService.addCrew(temp).subscribe({
      next: (res: any) => {
        this.handleSuccess("Crew Added Successfully")
        this.reset()
      }, error: (e: any) => {
        this.handleError("Server Error")
      }
    })
  }
}
