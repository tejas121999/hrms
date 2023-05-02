import { Component, Input, OnInit } from '@angular/core';
import { MasterServices } from 'src/app/services/master-services';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { LoanComponent } from '../loan/loan.component';
import * as moment from 'moment';
declare var UIkit: any;

@Component({
  selector: 'app-record-loan',
  templateUrl: './record-loan.component.html',
  styleUrls: ['./record-loan.component.scss'],
})
export class RecordLoanComponent implements OnInit {
  @Input('isEdit') isEdit: boolean = false;

  loanList: any;
  loan_data: any;
  userData: any
  emp_data: any
  buttonLoader = false
  loan_id: any;
  address = '';
  disbursementDate: any
  empList: any;
  emp_id: any;
  rateofinterest: any;
  loanamount: any;
  profileData: any;

  constructor(
    private formValidator: FormValidator,
    private masterService: MasterServices,
    private appPreference: AppPreference,
    private loanComponent: LoanComponent
  ) {

  }
  EmpLoanForm = new FormGroup({
    formName: new FormControl("EmpLoanForm"),
    loan_name: new FormControl('', [Validators.required]),
    emploan_owner_id: new FormControl(''),
    loan_employee_name: new FormControl('', [Validators.required]),
    rate_of_interest: new FormControl(''),
    loan_amount: new FormControl('', [Validators.required]),
    disbursment_date: new FormControl('', [Validators.required]),
    employee_address: new FormControl(''),
    exempt: new FormControl(''),
    loan_start_date: new FormControl('', [Validators.required]),
    instalment_amount: new FormControl('', [Validators.required]),
  })
  ngOnInit(): void {
    this.getProfile();
    this.getLoans();
    this.getEmp();
    this.setUpEdit();
    this.profileData = localStorage.getItem("PROFILE_INFO");
  }
  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }


  }

  reset() {
    this.loanComponent.getLoadData();
    this.buttonLoader = false;
    this.EmpLoanForm.reset()
    this.EmpLoanForm.patchValue({
      "formName": "EmpLoanForm"
    })
    UIkit.modal("#record-loan").hide();
  }
  getLoans() {
    let temp = {
      "where": false,
      "limit": 1000,
      "offset": 0,
      "loan_owner_id": this.userData?.data?.owner_id,
    }
    this.masterService.getloan(temp).subscribe({
      next: (res) => {
        console.log(res);

        this.loanList = res;
        this.loan_data = this.loanList.loan.rows;
      }, error: (e: any) => {
      }

    });
  }
  getEmp() {
    let temp = {
      "isDeleted": false,
      "limit": 5000,
      "offset": 0,
      "user_owner_id": this.userData?.data?.owner_id,
    }
    this.masterService.getEmp(temp).subscribe({
      next: (res) => {
        this.empList = res;
        this.emp_data = this.empList.employee.rows;
      }, error: (e: any) => {
      }

    });
  }
  filledLoadData() {

    let temp = {
      "loan_id": this.loan_id
    }
    this.masterService.getLoanID(temp).subscribe({
      next: (res) => {
        this.loanList = res;
        console.log(res);

        this.loanamount = this.loanList.loan.max_loan_ammount;
        this.rateofinterest = this.loanList.loan.rate_of_interest;
        var filterdurType = this.loanList.loan.duration_type;
        let month;
        if (filterdurType === "Years") {
          month = this.loanList.loan.duration * 12;

        }
        else {
          month = this.loanList.loan.duration;
        }
        const now = new Date()
        var Disbursement = new Date(new Date(now).setMonth(now.getMonth() + month));
        this.disbursementDate = Disbursement;

      }, error: (e: any) => {
        this.handleError(e.error)
   
      }

    });

  }
  getError(formGroup: FormGroup, controlName: any) {

    return this.formValidator.getErrorForControl(formGroup, controlName);
  }


  editUser() {

    if (this.EmpLoanForm.invalid) {
      this.EmpLoanForm.markAllAsTouched()

    } else {
      var temp = {
        "loan_id": this.id ,
        "emp_loan": {
              "loan_name": this.EmpLoanForm.get("loan_name")?.value,
            "loan_employee_name": this.EmpLoanForm.get("loan_employee_name")?.value,
            "rate_of_interest": this.EmpLoanForm.get("rate_of_interest")?.value,
            "loan_amount": this.EmpLoanForm.get("loan_amount")?.value,
            "disbursment_date": this.EmpLoanForm.get("disbursment_date")?.value,
            "employee_address": this.EmpLoanForm.get("employee_address")?.value,
            "exempt": this.EmpLoanForm.get("exempt")?.value,
            "loan_start_date": this.EmpLoanForm.get("loan_start_date")?.value,
            "instalment_amount": this.EmpLoanForm.get("instalment_amount")?.value,
        }
    }
    
      this.masterService.updateEmpLoan(temp).subscribe({
        next: (res) => {

          this.handleSuccess("Employee loan  updated successfully")
          UIkit.modal("#record-loan").hide();

          this.loanComponent.getLoadData();
          this.reset();
        }, error: (e: any) => {
          this.handleError(e)
        }
      })
    }



    this.buttonLoader = true;
   
  
  }

  filledEmpData() {
    console.log(this.emp_id);

    let temp = {
      "id": this.emp_id
    }
    this.masterService.getEmpID(temp).subscribe({
      next: (res) => {
        this.empList = res;
        console.log(this.empList);
        this.address = this.empList.employee.permanent_address;
      }, error: (e: any) => {
      }

    });


  }
  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }
  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }
  id: any;
  addEmployeeloan() {
    if (this.EmpLoanForm.invalid) {
      this.EmpLoanForm.markAllAsTouched()

    } else {
    this.buttonLoader = true;

    let data = {
      "loan_name": this.EmpLoanForm.get("loan_name")?.value,
      "emploan_owner_id": this.userData?.data?.owner_id,
      "loan_employee_name": this.EmpLoanForm.get("loan_employee_name")?.value,
      "rate_of_interest": this.EmpLoanForm.get("rate_of_interest")?.value,
      "loan_amount": this.EmpLoanForm.get("loan_amount")?.value,
      "disbursment_date": this.EmpLoanForm.get("disbursment_date")?.value,
      "employee_address": this.EmpLoanForm.get("employee_address")?.value,
      "exempt": this.EmpLoanForm.get("exempt")?.value,
      "loan_start_date": this.EmpLoanForm.get("loan_start_date")?.value,
      "instalment_amount": this.EmpLoanForm.get("instalment_amount")?.value,
    }

 

    this.masterService.addEmployeeloan(data).subscribe({
      next: (res) => {
        this.handleSuccess("Employee loan added successfully");
        this.reset()
      }, error: (e: any) => {
        this.handleError(e)
        this.buttonLoader = false;
      }


    })
  }
  }
  setUpEdit() {
    this.loanComponent.editData.subscribe({
      next: (data) => {

        this.isEdit = true,
          this.id = data.id,
          this.EmpLoanForm.get('loan_name')?.patchValue(data.loan_name),
          this.EmpLoanForm.get('employee_address')?.patchValue(data.employee_address),
          this.EmpLoanForm.get('instalment_amount')?.patchValue(data.instalment_amount),
          this.EmpLoanForm.get('loan_amount')?.patchValue(data.loan_amount),
          this.EmpLoanForm.get('disbursment_date')?.patchValue(data.disbursment_date),
          this.EmpLoanForm.get('loan_name')?.patchValue(data.loan_name),
          this.EmpLoanForm.get('rate_of_interest')?.patchValue(data.loan_data_name.rate_of_interest),
          this.EmpLoanForm.get('exempt')?.patchValue(data.exempt),
          this.EmpLoanForm.get('loan_start_date')?.patchValue(data.loan_start_date),
          this.EmpLoanForm.get('loan_employee_name')?.patchValue(data.loan_employee_name)
      }, error: (e: any) => {
        this.handleError(e)
        this.reset()
      }
    })

  }
}

