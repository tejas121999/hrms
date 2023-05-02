import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { ManageLeaveTypeComponent } from '../manage-leave-type/manage-leave-type.component';
declare var UIkit: any;
@Component({
  selector: 'app-add-leave-type',
  templateUrl: './add-leave-type.component.html',
  styleUrls: ['./add-leave-type.component.scss']
})
export class AddLeaveTypeComponent implements OnInit {
  @Input('isEdit') isEdit: boolean = false;
  @Input() bankData: any;
  leaveId: any
  buttondisable=false
  buttonLoader: boolean = false;
  preferenceKeys = PreferenceKeys;
  userData: any;
  constructor(
    private formValidator: FormValidator,
    private manageLeave: ManageLeaveTypeComponent,
    private masterService: MasterServices,
    private appPreference: AppPreference,
  ) { }

  leavetypeForm = new FormGroup({
    formName: new FormControl("leavetypeForm"),
    leave_name: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    no_of_days: new FormControl('', [Validators.required]),
    leave_desc: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
    this.setuoEdit()
    this.getProfile()

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
  

  setuoEdit() {
    this.manageLeave.editData.subscribe({
      next: (data: any) => {
        this.isEdit = true,
          this.leaveId = data.id,
          this.leavetypeForm.get('leave_name')?.patchValue(data.leave_name),
          this.leavetypeForm.get('no_of_days')?.patchValue(data.no_of_days),
          this.leavetypeForm.get('leave_desc')?.patchValue(data.leave_desc)
      }, error: (e: any) => {
        this.handleError(e)
      }
    })
  }
  addLeaveType() {
    this.buttondisable=true
    if (this.leavetypeForm.invalid) {
      
      console.log(this.leavetypeForm.markAllAsTouched());
      
      this.buttondisable=false
    } else {
      var temp = {
        leave_owner_id: this.userData.data.owner_id,
        leave_name: this.leavetypeForm.get('leave_name')?.value,
        no_of_days: this.leavetypeForm.get('no_of_days')?.value,
        leave_desc: this.leavetypeForm.get('leave_desc')?.value
      }
      this.masterService.addLeave(temp).subscribe({
        next: (res) => {
          this.manageLeave.getLevave();
          this.handleSuccess("Leave Type Add Successfully")
          this.reset();   

        }, error: (e: any) => {
          this.handleError(e)
          
          this.buttondisable=false
        }
      })
  
    }

  }

  editLeaveType() {
    this.buttonLoader = true
    var temp = {
      id: this.leaveId,
      leave_name: this.leavetypeForm.get('leave_name')?.value,
      no_of_days: this.leavetypeForm.get('no_of_days')?.value,
      leave_desc: this.leavetypeForm.get('leave_desc')?.value
    }
    this.masterService.updateLeave(temp).subscribe({
      next: (res) => {
        this.handleSuccess("Leave Type Updated Successfully")
        this.reset()
        this.buttonLoader = false
      }, error: (e: any) => {
        this.handleError(e)
      }
    })
  }

  reset() {
    this.isEdit = false;
    this.leavetypeForm.reset();
    window.location.reload()
    this.leavetypeForm.patchValue({
      "formName": "leavetypeForm"
    })
    this.manageLeave.getLevave()
    UIkit.modal("#add-leave-type").hide();
  
  }

  getError(formGroup: FormGroup, controlName: any) {
    return this.formValidator.getErrorForControl(formGroup, controlName);
  }

}
