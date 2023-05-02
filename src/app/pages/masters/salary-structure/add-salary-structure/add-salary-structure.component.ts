import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { ManageSalaryStructureComponent } from '../manage-salary-structure/manage-salary-structure.component';
declare var UIkit: any;
@Component({
  selector: 'app-add-salary-structure',
  templateUrl: './add-salary-structure.component.html',
  styleUrls: ['./add-salary-structure.component.scss']
})
export class AddSalaryStructureComponent implements OnInit {

  constructor(
    private formValidator: FormValidator,
    private masterService: MasterServices,
    private appPreference: AppPreference,
    private manageSalaryStructure: ManageSalaryStructureComponent
  ) { }
  @Input('isEdit') isEdit: boolean = false;
  @Input() bankData: any;
  salaryStructureId: any
  limit: number = 15
  loader: boolean = false;
  offset: number = 0
  gradeData: any[] = []
  salaryComponent: any[] = []
  salarystructForm = new FormGroup({
    formName: new FormControl("salarystructForm"),
    salary_structure_name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    salarycomp_name: new FormControl('', [Validators.required]),
    grade: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
    this.setupEdit()
    this.getGrade()
    this.getSalaryComp()
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }
  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }


  addSalarystruct() {
    var temp = {
      "salary_structure_name": this.salarystructForm.get('salary_structure_name')?.value,
      "salary_stru_comp_id": this.salarystructForm.get('salarycomp_name')?.value,
      "salary_stru_grade_id": this.salarystructForm.get('grade')?.value,
      "isDeleted": false
    }

    this.masterService.addSalaryStructure(temp).subscribe({
      next: (res) => {
        this.handleSuccess("Holiday Add Successfully")
        this.reset()
      }, error: (e: any) => {
        this.handleError(e)
      }
    })
  }

  updateSalaryStructure() {
    var temp = {
      "id": this.salaryStructureId,
      "salary_structure_name": this.salarystructForm.get('salary_structure_name')?.value,
      "salary_stru_comp_id": this.salarystructForm.get('salarycomp_name')?.value,
      "salary_stru_grade_id": this.salarystructForm.get('grade')?.value,
      "isDeleted": false
    }

    this.masterService.updateSalaryStructure(temp).subscribe({
      next: (res) => {
        this.handleSuccess("Holiday Add Successfully")
        this.reset()
      }, error: (e: any) => {
        this.handleError(e)
      }
    })
  }

  setupEdit() {
    this.manageSalaryStructure.editData.subscribe({
      next: (data: any) => {
        this.isEdit = true,
          this.salaryStructureId = data.id,
          this.salarystructForm.get('salary_structure_name')?.patchValue(data.salary_structure_name),
          this.salarystructForm.get('salarycomp_name')?.patchValue(data.salary_stru_comp_id),
          this.salarystructForm.get('grade')?.patchValue(data.salary_stru_grade_id)
      }, error: (e: any) => {
        this.handleError(e)
      }
    })
  }

  reset() {
    this.isEdit = false;
    this.salarystructForm.reset()
    this.salarystructForm.patchValue({
      "formName": "salarystructForm"
    })
    UIkit.modal("#add-salary-structure").hide();
    this.manageSalaryStructure.getSalaryStructure()
  }


  getGrade() {
    this.loader = true;
    var temp = {
      "where": false,
      "limit": this.limit,
      "offset": 0
    }

    this.masterService.getGrade(temp).subscribe({
      next: (res: any) => {
        console.log(res.grade.rows)
        this.gradeData = res.grade.rows
      },
      error: (err: any) => {
        this.handleError(err)
      }
    })
  }

  getSalaryComp() {
    this.loader = true;
    var temp = {
      "where": false,
      "limit": this.limit,
      "offset": 0
    }
    this.masterService.getSalaryComp(temp).subscribe({
      next: (res: any) => {
        this.salaryComponent = res.salaryComponent.rows
        console.log(" this.salaryComponent", this.salaryComponent)
      },
      error: (err) => {
        this.handleError(err)
      }
    })
  }

  getError(formGroup: FormGroup, controlName: any) {
    return this.formValidator.getErrorForControl(formGroup, controlName);
  }

}
