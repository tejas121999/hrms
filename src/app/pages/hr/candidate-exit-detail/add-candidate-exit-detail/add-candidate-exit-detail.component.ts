import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { ManageCandidateExitDetailComponent } from '../manage-candidate-exit-detail/manage-candidate-exit-detail.component';
declare var UIkit: any;
@Component({
  selector: 'app-add-candidate-exit-detail',
  templateUrl: './add-candidate-exit-detail.component.html',
  styleUrls: ['./add-candidate-exit-detail.component.scss']
})
export class AddCandidateExitDetailComponent implements OnInit {

  constructor(
    private formValidator: FormValidator,
    private masterService: MasterServices,
    private appPreference: AppPreference,
    private manageCandidate: ManageCandidateExitDetailComponent
  ) { }
  userData: any;
  employeeData: any[] = []
  id: any
  @Input('isEdit') isEdit: boolean = false;


  addCandidate = new FormGroup({
    formName: new FormControl("addCandidate"),
    employeee_name: new FormControl("", [Validators.required]),
    separation_date: new FormControl("", [Validators.required]),
    interviewer: new FormControl("", [Validators.required]),
    reason_for_leaving: new FormControl(""),
    organization: new FormControl(""),
    most_organization: new FormControl(""),
    organization_things: new FormControl(""),
    share_with: new FormControl(""),
    company_vehicle: new FormControl(""),
    equipments: new FormControl(""),
    security: new FormControl(""),
    exit_interview: new FormControl(""),
    notice_period: new FormControl(""),
    resignation_letter_submitted: new FormControl(""),
    manager_clearance: new FormControl(""),
  })

  ngOnInit(): void {
    this.getProfile();
    this.setupEdit()
  }

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }
    this.getEmployee()
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }
  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }


  getError(formGroup: FormGroup, controlName: any) {
    return this.formValidator.getErrorForControl(formGroup, controlName);
  }

  getEmployee() {
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
        console.log(this.employeeData);
      },
      error: (err: any) => {
        if (err.message) {
          this.handleError('Server Error')
        }
      }
    })
  }

  addExitCandidate() {
    var temp: any = {
      "exitDetails": {
        "employee_name": this.addCandidate.get('employeee_name')?.value,
        "separation_date": this.addCandidate.get('separation_date')?.value,
        "resignation_letter_submitted": this.addCandidate.get('resignation_letter_submitted')?.value,
        "manager_clearance": this.addCandidate.get('manager_clearance')?.value,
        "details": {
          "reason_for_leaving": this.addCandidate.get('reason_for_leaving')?.value,
          "organization": this.addCandidate.get('organization')?.value,
          "most_organization": this.addCandidate.get('most_organization')?.value,
          "organization_things": this.addCandidate.get('organization_things')?.value,
          "share_with": this.addCandidate.get('share_with')?.value,
          "company_vehicle": this.addCandidate.get('company_vehicle')?.value,
          "equipments": this.addCandidate.get('equipments')?.value,
          "security": this.addCandidate.get('security')?.value,
          "exit_interview": this.addCandidate.get('exit_interview')?.value,
          "notice_period": this.addCandidate.get('notice_period')?.value,
        },
        "owner_id": this.userData?.data?.owner_id,
        "interviewer": this.addCandidate.get('interviewer')?.value,
      }
    }

    this.masterService.addExitDetails(temp).subscribe({
      next: (res: any) => {
        this.handleSuccess("Added Successfully")
        this.reset()
      }, error: (err: any) => {
        this.handleError('Server Error')
      }
    })
  }

  updateExitDetails() {
    var temp = {
      "id": this.id,
      "exitDetails": {
        "employee_name": this.addCandidate.get('employeee_name')?.value,
        "separation_date": this.addCandidate.get('separation_date')?.value,
        "resignation_letter_submitted": this.addCandidate.get('resignation_letter_submitted')?.value,
        "manager_clearance": this.addCandidate.get('manager_clearance')?.value,
        "details": {
          "reason_for_leaving": this.addCandidate.get('reason_for_leaving')?.value,
          "organization": this.addCandidate.get('organization')?.value,
          "most_organization": this.addCandidate.get('most_organization')?.value,
          "organization_things": this.addCandidate.get('organization_things')?.value,
          "share_with": this.addCandidate.get('share_with')?.value,
          "company_vehicle": this.addCandidate.get('company_vehicle')?.value,
          "equipments": this.addCandidate.get('equipments')?.value,
          "security": this.addCandidate.get('security')?.value,
          "exit_interview": this.addCandidate.get('exit_interview')?.value,
          "notice_period": this.addCandidate.get('notice_period')?.value,
        },
        "interviewer": this.addCandidate.get('interviewer')?.value,
      }
    }
    this.masterService.editExitDetails(temp).subscribe({
      next: (res: any) => {
        this.handleSuccess("Added Successfully")
        this.reset()
      }, error: (err: any) => {
        this.handleError('Server Error')
      }
    })
  }

  reset() {
    this.addCandidate.reset()
    UIkit.modal("#add-exit-detail").hide();
    this.manageCandidate.getExitCandidate()
  }

  setupEdit() {
    this.manageCandidate.editData.subscribe({
      next: (data: any) => {
        console.log("======", data)
        this.id = data.id
        this.addCandidate.patchValue(data)
        this.addCandidate.patchValue(data.details)
        this.addCandidate.get('employeee_name')?.patchValue(data.employee_name)
      }
    })
  }

}
