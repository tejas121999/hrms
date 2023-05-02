import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { ManageLoanTypeComponent } from '../manage-loan-type/manage-loan-type.component';
declare var UIkit: any;
@Component({
  selector: 'app-add-loan-type',
  templateUrl: './add-loan-type.component.html',
  styleUrls: ['./add-loan-type.component.scss']
})
export class AddLoanTypeComponent implements OnInit {
  loanId:any
 preferenceKeys = PreferenceKeys;
 @Input('isEdit') isEdit: boolean = false;
   userData: any;
  constructor(
    private formValidator: FormValidator,
    private masterService: MasterServices,
    private appPreference: AppPreference,
    private manageLoanTypeComponent:ManageLoanTypeComponent
  ) { 

  }

  ngOnInit(): void {
       this.setupEdit()
    this.getProfile()
  }

  loanForm = new FormGroup({
    formName: new FormControl("loanForm"),
    loan_name: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    rate_of_interest: new FormControl('', [Validators.required]),
    max_loan_amount: new FormControl('', [Validators.required,Validators.pattern('^[0-9]*$')]),
    duration: new FormControl('', [Validators.required,Validators.pattern('^[0-9]*$')]),
    duration_type: new FormControl('', [Validators.required]),
  })
  reset() {
    this.isEdit = false;
    this.loanForm.reset()
    this.loanForm.patchValue({
      "formName": "loanForm"
    })
    UIkit.modal("#add-loan-type").hide();
    this.manageLoanTypeComponent.getloanList()
  }

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }
    
  }
  setupEdit() {
    this.manageLoanTypeComponent.editData.subscribe({
      next: (data) => {
       
        
        this.isEdit = true,
          this.loanId = data.id,
          this.loanForm.get('loan_name')?.patchValue(data.loan_name),
          this.loanForm.get('rate_of_interest')?.patchValue(data.rate_of_interest),
          this.loanForm.get('max_loan_amount')?.patchValue(data.max_loan_ammount),
          this.loanForm.get('duration')?.patchValue(data.duration),
          this.loanForm.get('duration_type')?.patchValue(data.duration_type)
      }, error: (e: any) => {
        this.handleError(e)
        this.reset()
      }
    })
  }

  numberMonth=[
    {name:'Months'},
    {name:'Years'}
  ]

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
    // this.holidayComponent.getHolidayList();
  }
  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }
  addLoan(){
    if (this.loanForm.invalid) {
      this.loanForm.markAllAsTouched()
    } else {
      let temp={
        "loan":{
          "loan_name": this.loanForm.get('loan_name')?.value, 
          "rate_of_interest": this.loanForm.get('rate_of_interest')?.value, 
          "max_loan_ammount": this.loanForm.get('max_loan_amount')?.value, 
          "duration": this.loanForm.get('duration')?.value, 
          "duration_type": this.loanForm.get('duration_type')?.value, 
          "loan_owner_id": this.userData?.data?.owner_id,
      }

      }
        
      this.masterService.addloan(temp).subscribe({
        next: (res) => {
          this.handleSuccess("Loan added successfully");
          this.manageLoanTypeComponent.getloanList();

          this.reset()
       
        }, error: (e: any) => {
          this.handleError(e.error)
   
        }
      })
    }
  }
  updateLoan() {
    if (this.loanForm.invalid) {
      this.loanForm.markAllAsTouched()

    } else {
      var temp = {
          "loan_id": this.loanId,
          "loan": {
              "loan_name":  this.loanForm.get('loan_name')?.value, 
              "rate_of_interest": this.loanForm.get('rate_of_interest')?.value, 
              "max_loan_ammount": this.loanForm.get('max_loan_amount')?.value,
              "duration": this.loanForm.get('duration')?.value, 
              "duration_type": this.loanForm.get('duration_type')?.value, 
              "loan_owner_id": this.userData?.data?.owner_id
          }
      }
    
      this.masterService.updateLoan(temp).subscribe({
        next: (res) => {

          this.handleSuccess("Loan updated successfully")
          this.manageLoanTypeComponent.getloanList();
          this.reset();
        }, error: (e: any) => {
          this.handleError(e)
        }
      })
    }
  }

  getError(formGroup: FormGroup, controlName: any) {
    return this.formValidator.getErrorForControl(formGroup, controlName);
  }

}
