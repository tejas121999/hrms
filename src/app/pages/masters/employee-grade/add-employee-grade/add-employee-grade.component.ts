import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { ManageEmployeeGradeComponent } from '../manage-employee-grade/manage-employee-grade.component';
declare var UIkit: any;

@Component({
  selector: 'app-add-employee-grade',
  templateUrl: './add-employee-grade.component.html',
  styleUrls: ['./add-employee-grade.component.scss']
})
export class AddEmployeeGradeComponent implements OnInit {
  @Input('isEdit') isEdit: boolean = false;
  loader: boolean = false;
  buttonLoader: boolean = false;
  id: any
  constructor(
    private formValidator: FormValidator,
    private masterService: MasterServices,
    private manageemployeegrade: ManageEmployeeGradeComponent,
    private appPreference: AppPreference) { }

  employeeGradeForm = new FormGroup({
    formName: new FormControl("employeeGradeForm"),
    grade_name: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
    this.setupEdit()
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
    this.manageemployeegrade.getGrade();
    this.loader = false;
    this.isEdit = false
  }
  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  addEmployeeGrade() {
    this.masterService.addGrade(this.employeeGradeForm.value).subscribe({
      next: (res) => {
        this.handleSuccess("Grade Added Successfully");
        this.reset();
      },
      error: (e: any) => {
        this.handleError(e)
      }
    })
  }

  reset() {
    this.isEdit = false;
    this.employeeGradeForm.reset()
    this.employeeGradeForm.patchValue({
      "formName": "employeeGradeForm"
    })
    UIkit.modal("#add-employee-grade").hide();
  }

  setupEdit() {
    this.manageemployeegrade.editData.subscribe({
      next: (data: any) => {
        console.log(data)
        this.id = data.id
        this.employeeGradeForm.patchValue(data)
        this.id = data.id
        this.isEdit = true
      }, error: (e) => {
        this.handleError(e);
        this.reset()
      }
    })
  }

  editGrade() {
    var temp = {
      "id": this.id,
      "grade_name": this.employeeGradeForm.get('grade_name')?.value
    }
    this.masterService.editGrade(temp).subscribe({
      next: (res: any) => {
        this.handleSuccess("Updated Successfully");
        this.reset();
      }, error: (e: any) => {
        this.handleError(e)
      }
    })
  }
  getError(formGroup: FormGroup, controlName: any) {
    return this.formValidator.getErrorForControl(formGroup, controlName);
  }
}
