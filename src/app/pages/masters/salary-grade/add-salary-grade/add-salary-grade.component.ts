import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { ManageSalaryGradeComponent } from '../manage-salary-grade/manage-salary-grade.component';
declare var UIkit: any;

@Component({
  selector: 'app-add-salary-grade',
  templateUrl: './add-salary-grade.component.html',
  styleUrls: ['./add-salary-grade.component.scss']
})
export class AddSalaryGradeComponent implements OnInit {

  salaryGradeFormData: any = [];
  componentId = [];
  limit = 1000
  loader: boolean = false;

  constructor(private formValidator: FormValidator,
    private masterServices: MasterServices,
    private managesalarygrade: ManageSalaryGradeComponent,
    private appPreference: AppPreference) { }

  salarygradeForm = new FormGroup({
    formName: new FormControl("salarygradeForm"),
    salary_grade: new FormControl('', [Validators.required]),
    component_name: new FormControl('', [Validators.required]),
    grade: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
    // this.managebranch.getBranch();
    this.loader = false;
  }
  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  addSalarygrade() {
    var temp = {
      salary_grade: this.salarygradeForm.get('salary_grade')?.value,
      grade_name: this.salarygradeForm.get('grade')?.value,
      salary_component_name: this.salarygradeForm.get('component_name')?.value,
    }
    this.masterServices.addSalaryGrade(temp).subscribe({
      next: (response: any) => {
        this.handleSuccess("Salary Grade Added Successfully");
        this.reset();
        this.formData(response)
        console.log(response)
        // this.close('saving');
        setTimeout(() => {
          this.handleSuccess(response);
          this.reset();
          this.formData(response)
        }, 1000)
      }, error: (e: any) => {
        this.handleError(e)
      }
    })
    // console.log(this.salarygradeForm)
  }

  getComponent() {
    var temp = {
      "limit": this.limit,
      "offset": 0
    }
    this.masterServices.getSalaryComp(temp).subscribe({
      next: (res: any) => {
        this.setData(res.component_name)
        // this.handleSuccess(res);
        this.reset();
      },
      error: (err) => {
        this.handleError(err)
      }
    })
  }

  gradeData: any[] = []

  getGrade() {
    this.loader = true;
    var temp = {
      "limit": this.limit,
      "offset": 0
    }
    this.masterServices.getGrade(temp).subscribe({
      next: (res: any) => {
        console.log(res.grade.rows)
        this.gradeData = res.grade.rows
      },
      error: (err: any) => {
        this.handleError(err)
      }
    })
  }

  formData(response: any) {
    // this.salaryGradeFormData = response['createBranch']
    console.log(this.salaryGradeFormData)
  }

  setData(res: any) {
    this.componentId = res.rows
    console.log(this.salarygradeForm)
  }

  reset() {
    this.salarygradeForm.reset()
    this.salarygradeForm.patchValue({
      "formName": "salarygradeForm"
    })
    UIkit.modal("#add-salary-grade").hide();
    this.managesalarygrade.getSalaryGrade()
  }

  getError(formGroup: FormGroup, controlName: any) {
    console.log(formGroup, controlName)
    return this.formValidator.getErrorForControl(formGroup, controlName);
  }

}
