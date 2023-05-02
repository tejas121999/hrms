import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { ManageSalaryCompComponent } from '../manage-salary-comp/manage-salary-comp.component';
declare var UIkit: any;

@Component({
  selector: 'app-add-salary-comp',
  templateUrl: './add-salary-comp.component.html',
  styleUrls: ['./add-salary-comp.component.scss']
})
export class AddSalaryCompComponent implements OnInit {

  @Input('isEdit') isEdit: boolean = false;
  loader: boolean = false;
  salaryCompFormData: any = []
  id: any
  userData: any;
  preferenceKeys = PreferenceKeys;
  disablebtn: boolean = false;
  disableContribution: boolean = true
  disableFBP: boolean = true
  disableTax: boolean = true
  disableEarnings: boolean = false

  constructor(
    private formValidator: FormValidator,
    private masterService: MasterServices,
    private managesalarycomp: ManageSalaryCompComponent,
    private appPreference: AppPreference
  ) { }

  salaryComponentForm = new FormGroup({
    formName: new FormControl("salaryComponentForm"),
    component_name: new FormControl('', [Validators.required]),
    component_code: new FormControl('', [Validators.required]),
    ledger: new FormControl('', [Validators.required]),
    component_type: new FormControl(''),
    pay_type: new FormControl(''),
    calculation_type: new FormControl(''),
    calculate_value: new FormControl(''),
    make_this_earning_a_part_of_the_employees_salary_structure: new FormControl(''),
    this_is_a_taxable_earning: new FormControl(''),
    tax_deduction_preference: new FormControl(''),
    calculate_on_pro_rate_basis: new FormControl(''),
    Include_This_As_a_Flexible_Benefit_Plan_Component: new FormControl(''),
    Restrict_Employee_From_Overriding_The_FBP_Amount: new FormControl(''),
    Consider_For_EPF_Contribution: new FormControl(''),
    Consider_For_EPF_Contribution_: new FormControl(''),
    Consider_For_ESI_Contribution: new FormControl(''),
    Show_This_Component_In_Payslip: new FormControl('')
  })

  salarycompForm = new FormGroup({
    formName: new FormControl("salarycompForm"),
    salary_component_name: new FormControl('', [Validators.required]),
    salary_component_code: new FormControl('', [Validators.required]),
    leager: new FormControl('', [Validators.required]),
    description: new FormControl('')
  })

  ngOnInit(): void {
    this.getProfile()
    this.setupEdit()
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
    this.managesalarycomp.getSalaryComp();
    this.loader = false;
    this.isEdit = false
  }
  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  isEarning(checked: any) {
    this.disableEarnings = checked
    if (!checked) {
      this.disableEarnings = true;
    }
    else {
      this.disableEarnings = false
    }
  }

  isContribution(checked: any) {
    this.disableContribution = checked
    if (!checked) {
      this.disableContribution = true;
    }
    else {
      this.disableContribution = false
    }
  }

  isFBPComponent(checked: any) {
    if (!checked) {
      this.disableFBP = true
    }
    else {
      this.disableFBP = false
    }
  }

  isTaxable(checked: any) {
    if (!checked) {
      this.disableTax = true
    }
    else {
      this.disableTax = false
    }
  }

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }
  }

  addSalarycomp() {
    this.disablebtn = true
    if (this.salaryComponentForm.invalid) {
      this.salaryComponentForm.markAllAsTouched()
      this.disablebtn = false
    } else {
      var temp = {
        "salaryComponent": {
          component_owner_id: this.userData?.data?.owner_id,
          salary_component_name: this.salaryComponentForm.get('component_name')?.value,
          salary_component_code: this.salaryComponentForm.get('component_code')?.value,
          ledger: this.salaryComponentForm.get('ledger')?.value,
          component_type: this.salaryComponentForm.get('component_type')?.value,
          pay_type: this.salaryComponentForm.get('pay_type')?.value,
          calculation_type: this.salaryComponentForm.get('calculation_type')?.value,
          calculate_value: this.salaryComponentForm.get('calculate_value')?.value,
          "configurations": {
            make_this_earning_a_part_of_the_employees_salary_structure: this.salaryComponentForm.get('make_this_earning_a_part_of_the_employees_salary_structure')?.value,
            this_is_a_taxable_earning: this.salaryComponentForm.get('this_is_a_taxable_earning')?.value,
            tax_deduction_preference: this.salaryComponentForm.get('tax_deduction_preference')?.value,
            calculate_on_pro_rate_basis: this.salaryComponentForm.get('calculate_on_pro_rate_basis')?.value,
            Include_This_As_a_Flexible_Benefit_Plan_Component: this.salaryComponentForm.get('Include_This_As_a_Flexible_Benefit_Plan_Component')?.value,
            Restrict_Employee_From_Overriding_The_FBP_Amount: this.salaryComponentForm.get('Restrict_Employee_From_Overriding_The_FBP_Amount')?.value,
            Consider_For_EPF_Contribution: this.salaryComponentForm.get('Consider_For_EPF_Contribution')?.value,
            Consider_For_EPF_Contribution_: this.salaryComponentForm.get('Consider_For_EPF_Contribution_')?.value,
            Consider_For_ESI_Contribution: this.salaryComponentForm.get('Consider_For_ESI_Contribution')?.value,
            Show_This_Component_In_Payslip: this.salaryComponentForm.get('Show_This_Component_In_Payslip')?.value
          }
        }
      }
      this.masterService.addSalaryComp(temp).subscribe({
        next: (response: any) => {
          setTimeout(() => {
            this.handleSuccess("Salary Component Added Successfully");
            this.reset();
            this.formData(response)
            this.disablebtn = false

          }, 1000)
        }, error: (e: any) => {
          this.handleError(e)
          this.disablebtn = false

        }
      })
    }
    // console.log(this.salarycompForm)
  }

  formData(response: any) {
    this.salaryCompFormData = response['salaryComponent']
    console.log(this.salaryCompFormData)
  }

  setupEdit() {
    this.managesalarycomp.editData.subscribe({
      next: (data: any) => {
        console.log(data?.component_type)
        this.id = data.id
        this.salaryComponentForm.patchValue({
          component_name: data?.salary_component_name,
          component_code: data?.salary_component_code,
          ledger: data?.ledger,
          component_type: data?.component_type,
          pay_type: data?.pay_type,
          calculation_type: data?.calculation_type,
          calculate_value: data?.calculate_value,
          make_this_earning_a_part_of_the_employees_salary_structure: data?.configurations?.make_this_earning_a_part_of_the_employees_salary_structure,
          this_is_a_taxable_earning: data?.configurations?.this_is_a_taxable_earning,
          tax_deduction_preference: data?.configurations?.tax_deduction_preference,
          calculate_on_pro_rate_basis: data?.configurations?.calculate_on_pro_rate_basis,
          Include_This_As_a_Flexible_Benefit_Plan_Component: data?.configurations?.Include_This_As_a_Flexible_Benefit_Plan_Component,
          Restrict_Employee_From_Overriding_The_FBP_Amount: data?.configurations?.Restrict_Employee_From_Overriding_The_FBP_Amount,
          Consider_For_EPF_Contribution: data?.configurations?.Consider_For_EPF_Contribution,
          Consider_For_EPF_Contribution_: data?.configurations?.Consider_For_EPF_Contribution_,
          Consider_For_ESI_Contribution: data?.configurations?.Consider_For_ESI_Contribution,
          Show_This_Component_In_Payslip: data?.configurations?.Show_This_Component_In_Payslip
        })
        if (data?.component_type === "Earnings") {
          this.isEarning(true)
        } else if (data?.component_type === "Deduction" || data?.component_type === "Reimbursements") {
          this.isEarning(false)
        }
        if (data?.configurations?.this_is_a_taxable_earning) {
          this.isTaxable(true)
        }
        if (data?.configurations?.Include_This_As_a_Flexible_Benefit_Plan_Component) {
          this.isFBPComponent(true)
        }
        if (data?.configurations?.Consider_For_EPF_Contribution) {
          this.isContribution(true)
        }
        this.isEdit = true
      }, error: (e) => {
        this.handleError(e);
        this.reset()
      }
    })
  }
  prepareEditPayloade() {
    var temp: any
    if (this.salaryComponentForm.get("component_type")?.value === "Deduction" || this.salaryComponentForm.get("component_type")?.value === "Reimbursements") {
      temp = {
        "id": this.id,
        "data": {
          component_owner_id: this.userData?.data?.owner_id,
          salary_component_name: this.salaryComponentForm.get('component_name')?.value,
          salary_component_code: this.salaryComponentForm.get('component_code')?.value,
          ledger: this.salaryComponentForm.get('ledger')?.value,
          component_type: this.salaryComponentForm.get('component_type')?.value,
          pay_type: null,
          calculation_type: null,
          calculate_value: null,
          "configurations": {
            make_this_earning_a_part_of_the_employees_salary_structure: null,
            this_is_a_taxable_earning: null,
            tax_deduction_preference: null,
            calculate_on_pro_rate_basis: null,
            Include_This_As_a_Flexible_Benefit_Plan_Component: null,
            Restrict_Employee_From_Overriding_The_FBP_Amount: null,
            Consider_For_EPF_Contribution: null,
            Consider_For_EPF_Contribution_: null,
            Consider_For_ESI_Contribution: null,
            Show_This_Component_In_Payslip: null
          }
        }
      }
    } else {
      temp = {
        "id": this.id,
        "data": {
          component_owner_id: this.userData?.data?.owner_id,
          salary_component_name: this.salaryComponentForm.get('component_name')?.value,
          salary_component_code: this.salaryComponentForm.get('component_code')?.value,
          ledger: this.salaryComponentForm.get('ledger')?.value,
          component_type: this.salaryComponentForm.get('component_type')?.value,
          pay_type: this.salaryComponentForm.get('pay_type')?.value,
          calculation_type: this.salaryComponentForm.get('calculation_type')?.value,
          calculate_value: this.salaryComponentForm.get('calculate_value')?.value,
          "configurations": {
            make_this_earning_a_part_of_the_employees_salary_structure: this.salaryComponentForm.get('make_this_earning_a_part_of_the_employees_salary_structure')?.value,
            this_is_a_taxable_earning: this.salaryComponentForm.get('this_is_a_taxable_earning')?.value,
            tax_deduction_preference: this.salaryComponentForm.get('tax_deduction_preference')?.value,
            calculate_on_pro_rate_basis: this.salaryComponentForm.get('calculate_on_pro_rate_basis')?.value,
            Include_This_As_a_Flexible_Benefit_Plan_Component: this.salaryComponentForm.get('Include_This_As_a_Flexible_Benefit_Plan_Component')?.value,
            Restrict_Employee_From_Overriding_The_FBP_Amount: this.salaryComponentForm.get('Restrict_Employee_From_Overriding_The_FBP_Amount')?.value,
            Consider_For_EPF_Contribution: this.salaryComponentForm.get('Consider_For_EPF_Contribution')?.value,
            Consider_For_EPF_Contribution_: this.salaryComponentForm.get('Consider_For_EPF_Contribution_')?.value,
            Consider_For_ESI_Contribution: this.salaryComponentForm.get('Consider_For_ESI_Contribution')?.value,
            Show_This_Component_In_Payslip: this.salaryComponentForm.get('Show_This_Component_In_Payslip')?.value
          }
        }
      }
    }
    return temp
  }

  editSalaryComp() {
    // var temp = {
    //   "id": this.id,
    //   "data": {
    //     component_owner_id: this.userData?.data?.owner_id,
    //     salary_component_name: this.salaryComponentForm.get('component_name')?.value,
    //     salary_component_code: this.salaryComponentForm.get('component_code')?.value,
    //     ledger: this.salaryComponentForm.get('ledger')?.value,
    //     component_type: this.salaryComponentForm.get('component_type')?.value,
    //     pay_type: this.salaryComponentForm.get('pay_type')?.value,
    //     calculation_type: this.salaryComponentForm.get('calculation_type')?.value,
    //     calculate_value: this.salaryComponentForm.get('calculate_value')?.value,
    //     "configurations": {
    //       make_this_earning_a_part_of_the_employees_salary_structure: this.salaryComponentForm.get('make_this_earning_a_part_of_the_employees_salary_structure')?.value,
    //       this_is_a_taxable_earning: this.salaryComponentForm.get('this_is_a_taxable_earning')?.value,
    //       tax_deduction_preference: this.salaryComponentForm.get('tax_deduction_preference')?.value,
    //       calculate_on_pro_rate_basis: this.salaryComponentForm.get('calculate_on_pro_rate_basis')?.value,
    //       Include_This_As_a_Flexible_Benefit_Plan_Component: this.salaryComponentForm.get('Include_This_As_a_Flexible_Benefit_Plan_Component')?.value,
    //       Restrict_Employee_From_Overriding_The_FBP_Amount: this.salaryComponentForm.get('Restrict_Employee_From_Overriding_The_FBP_Amount')?.value,
    //       Consider_For_EPF_Contribution: this.salaryComponentForm.get('Consider_For_EPF_Contribution')?.value,
    //       Consider_For_EPF_Contribution_: this.salaryComponentForm.get('Consider_For_EPF_Contribution_')?.value,
    //       Consider_For_ESI_Contribution: this.salaryComponentForm.get('Consider_For_ESI_Contribution')?.value,
    //       Show_This_Component_In_Payslip: this.salaryComponentForm.get('Show_This_Component_In_Payslip')?.value
    //     }
    //   }
    // }
    // console.log(temp)
    this.masterService.editSalaryComp(this.prepareEditPayloade()).subscribe({
      next: (res: any) => {
        this.handleSuccess("Salary Component Updated Successfully");
        this.reset();
        this.formData(res)
      },
      error: (e: any) => {
        this.handleError(e)
      }
    })
  }

  reset() {
    this.isEdit = false;
    this.salaryComponentForm.reset()
    this.salaryComponentForm.patchValue({
      "formName": "salaryComponentForm"
    })
    UIkit.modal("#add-salary-comp").hide();
  }

  getError(formGroup: FormGroup, controlName: any) {
    return this.formValidator.getErrorForControl(formGroup, controlName);
  }

}
