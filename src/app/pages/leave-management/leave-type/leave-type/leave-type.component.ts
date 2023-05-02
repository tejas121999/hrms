import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { ManageLeaveTypeComponent } from '../manage-leave-type/manage-leave-type.component';
declare var UIkit: any;

@Component({
  selector: 'app-leave-type',
  templateUrl: './leave-type.component.html',
  styleUrls: ['./leave-type.component.scss']
})
export class LeaveTypeComponent implements OnInit {
  // appPreference: any;

  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference,
    private manageleavetype: ManageLeaveTypeComponent,
    private formValidator: FormValidator,
    private fb: FormBuilder,
  ) { }

  userData: any;
  preferenceKeys = PreferenceKeys;
  leaveTypeData: any[] = []
  buttonLoader: boolean = false;
  loader: boolean = false;
  @Input('isEdit') isEdit: boolean = false;
  id: any;
  disableProrate: boolean = true
  disableEmpProbation: boolean = true
  disableProbation: boolean = true
  disableCarryForward: boolean = true
  disableDays: boolean = true
  disablePriviledge: boolean = true
  limit: number = 10
  offset: number = 0
  leaveData: any[] = []
  departmentData: any[] = []
  color: any
  buttondisable = false;
  delete_criteria: any[] = []
  myDropDown = false;

  ngOnInit(): void {
    this.getProfile()
    this.getById()
    this.setupEdit()
    console.log(this.leaveTypeData)
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  // leaveTypeForm = new FormGroup({
  //   formName: new FormControl("leaveTypeForm"),
  //   LT_1: new FormControl(''),
  //   LT_2: new FormControl(''),
  //   LT_3: new FormControl(''),
  //   no_leave: new FormControl(''),
  //   exc_criteria: new FormControl(''),
  // })

  leaveTypeForm = new FormGroup({
    formName: new FormControl("leaveTypeForm"),
    leave_name: new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.maxLength(150)]),
    no_of_days: new FormControl('',[Validators.required]),
    LT_1: new FormControl(''),
    LT_2: new FormControl(''),
    LT_3: new FormControl(''),
    working_days: new FormControl({ value: '', disabled: true }),
    earned_days: new FormControl({ value: '', disabled: true }),
    LT_4: new FormControl(''),
    LT_5: new FormControl(''),
    LT_6: new FormControl(''),
    LT_7: new FormControl(''),
    LT_8: new FormControl(''),
    LT_9: new FormControl(''),
    LT_10: new FormControl(''),
    LT_11: new FormControl(''),
    LT_12: new FormControl(''),
    LT_13: new FormControl({ value: '', disabled: true }),
    LT_14: new FormControl({ value: '', disabled: true }),
    LT_15: new FormControl(''),
    LT_16: new FormControl({ value: '', disabled: true }),
    LT_17: new FormControl({ value: '', disabled: true }),
    // criteria_option: new FormControl(0),
    // amount: new FormControl(''),
    LT_18: new FormControl({ value: '', disabled: true }),
    LT_19: new FormControl(''),
    LT_20: new FormControl({ value: 0, disabled: true }),
    LT_21: new FormControl({ value: '', disabled: true }),
    LT_22: new FormControl(''),
    LT_23: new FormControl(''),
    LT_24: new FormControl(''),
    LT_25: new FormControl(''),
    LT_26: new FormControl(''),
    LT_27: new FormControl(''),
    LT_28: new FormControl(''),
    LT_29: new FormControl(''),
    LT_30: new FormControl(''),
    LT_31: new FormControl(''),
    LT_32: new FormControl(''),
    LT_33: new FormControl(''),
    LT_34: new FormControl(''),
    LT_35: new FormControl(''),
    LT_36: new FormControl({ value: '', disabled: true }),
    LT_37: new FormControl(''),
    LT_38: new FormControl(''),
    LT_39: new FormControl(''),
    LT_40: new FormControl(''),
    LT_41: new FormControl(''),
    LT_42: new FormControl(''),
    LT_43: new FormControl(''),
    LT_44: new FormControl(''),
    LT_45: new FormControl(''),
    LT_46: new FormControl(''),
    priviledge: new FormControl('')
  })

  criteriaForm: FormGroup = this.fb.group({
    criteriaOption: this.fb.array([])
  })

  get criteriaOptionForm() {
    return this.criteriaForm.get('criteriaOption') as FormArray
  }

  addItems() {
    const leaveCriteria: any = this.fb.group({
      criteria_option: [''],
      number_of_leaves: ['']
    })
    this.criteriaOptionForm.push(leaveCriteria)
  }

  removeItem(i: any, data: any) {
    // if(this.criteriaOptionForm?.controls.length > 1){
    this.delete_criteria.push({ "id": data.value.id })
    this.criteriaOptionForm.removeAt(i)
    // }else{
    //   this.handleError("You can't delete 1st row")
    // }
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
    this.manageleavetype.getLeaveType();
    this.loader = false;
  }
  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  onChangeofOptions(newGov: any) {
    console.log(newGov.name);

    let val = newGov;
    if (val.id !== 0) {
      this.myDropDown = true
    } else {
      this.myDropDown = false
    }

  }

  selectOption(event: any) {
    console.log(event.name);

    if (event.name == 'No') {
      this.leaveTypeForm.get('LT_13')?.disable();
      this.leaveTypeForm.get('LT_14')?.disable();
      this.disableProrate = true
    } else {
      this.leaveTypeForm.get('LT_13')?.enable();
      this.leaveTypeForm.get('LT_14')?.enable();
      this.disableProrate = false
    }
  }

  selectCarryForward(event: any) {
    console.log(event.name);

    if (event.name == 'No') {
      this.leaveTypeForm.get('LT_20')?.disable();
      this.leaveTypeForm.get('LT_21')?.disable();
      this.disableCarryForward = true
    } else {
      this.leaveTypeForm.get('LT_20')?.enable();
      this.leaveTypeForm.get('LT_21')?.enable();
      this.disableCarryForward = false
    }
  }

  selectEmpProbation(event: any) {
    console.log(event.name);

    if (event.name == 'No') {
      this.leaveTypeForm.get('LT_16')?.disable();
      this.disableEmpProbation = true
    } else {
      this.leaveTypeForm.get('LT_16')?.enable();
      this.disableEmpProbation = false
    }
  }

  selectDays(event: any) {
    console.log(event.name);

    if (event.name == 'Yes') {
      this.leaveTypeForm.get('LT_36')?.disable();
      this.disableDays = true
    } else {
      this.leaveTypeForm.get('LT_36')?.enable();
      this.disableDays = false
    }
  }

  selectProbationOver(event: any) {
    if (event.name == 'Prorate') {
      this.leaveTypeForm.get('LT_17')?.enable();
      this.leaveTypeForm.get('LT_18')?.enable();
      this.disableProbation = false
    }
    else {
      this.leaveTypeForm.get('LT_17')?.disable();
      this.leaveTypeForm.get('LT_18')?.disable();
      this.disableProbation = true
    }
  }

  isPriviledge(checked: any) {
    if (checked) {
      this.leaveTypeForm.get('working_days')?.enable();
      this.leaveTypeForm.get('earned_days')?.enable();
      this.disablePriviledge = false
    }
    else {
      this.leaveTypeForm.get('working_days')?.disable();
      this.leaveTypeForm.get('earned_days')?.disable();
      this.disablePriviledge = true
    }
  }

  options = [
    { name: "Yes" },
    { name: "No" }
  ]
  on_prorate = [
    { name: "Yes" },
    { name: "No" }
  ]
  emp_probation = [
    { name: "Yes" },
    { name: "No" }
  ]

  on_prorate_by = [
    { name: "Weekly" },
    { name: "Bi Monthly" },
    { name: "Monthly" },
    { name: "Quarterly" },
    { name: "Half Yearly" },
  ]

  when_prorate = [
    { name: "Beginning" },
    { name: "End" }
  ]

  probation_over = [
    { name: "Grant All" },
    { name: "Prorate" },
    { name: "Accumulate" }
  ]

  reminder = [
    { name: "Expire" },
    { name: "Encash" }
  ]

  frequency = [
    { name: "Monthly" },
    { name: "Quarterly" },
    { name: "Half Yearly" },
    { name: "Yearly" }
  ]

  from = [
    { name: "January" },
    { name: "Fabruary" },
    { name: "March" },
    { name: "April" },
    { name: "May" },
    { name: "June" },
    { name: "July" },
    { name: "August" },
    { name: "September" },
    { name: "October" },
    { name: "November" },
    { name: "December" }
  ]

  criteria = [
    { name: "Department" },
    { name: "Branch" },
    { name: "Business Segment" },
    { name: "Product" },
    { name: "Employment Type" },
    { name: "Grade" },
    { name: "Gender" },
    { name: "Marital Status" },
    { name: "Company" },
    { name: "No. of month in service" }
  ]

  criteriaValue = [
    { name: "Business Development" },
    { name: "Clients" },
    { name: "Finance & Accounts" },
    { name: "Human Resource" },
    { name: "Management" },
    { name: "Marketing" }
  ]

  value = [
    { id: 1, name: "Percentage" },
    { id: 0, name: "Amount" }
  ]

  consider_leave = [
    { name: "Loss of Pay" },
    { name: "Loss Without Pay" }
  ]

  calculate_leave = [
    { name: "Grant All" },
    { name: "Date Of Joining" },
    { name: "After Probation Date" }
  ]

  allocate_leave = [
    { name: "Current Year" },
    { name: "Previous Year" }
  ]
  mode = [
    { name: "None" },
    { name: "Round Up" },
    { name: "Round Down" }
  ]

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO),
      leave_type_id: this.appPreference.getObject(PreferenceKeys.LEAVE_TYPE_ID)
    }
    // this.getLeave();
  }

  getDepartment(criteria: any) {
    if (criteria.name == 'Department') {
      var temp = {
        "where": false,
        "limit": this.limit,
        "offset": this.offset,
        "department_owner_id": this.userData?.data?.owner_id
      }
      this.masterService.getDepartment(temp).subscribe({
        next: (res: any) => {
          console.log(res)
          this.departmentData = res.department
          this.loader = false;
        },
        error: (err) => {
          this.handleError(err)
        }
      })
    }
  }


  addLeaveType() {
    this.buttonLoader = true;
    if(this.leaveTypeForm.invalid){
      this.leaveTypeForm.markAllAsTouched();
      this.buttonLoader = false;
    }else{
      var leaveCriteria = [...this.criteriaOptionForm.value]
      console.log("add value", this.leaveTypeForm.value)
      delete this.leaveTypeForm.value['formName']
      delete this.leaveTypeForm.value['leave_name'];
      delete this.leaveTypeForm.value['no_of_days'];
      this.buttonLoader = true
      this.buttondisable = true;
      var temp = {
        "leave_name": this.leaveTypeForm.get("leave_name")?.value,
        "no_of_days": this.leaveTypeForm.get('no_of_days')?.value,
        "data": this.leaveTypeForm.value,
        "leave_amount_criteria": leaveCriteria,
        "company_id": this.userData?.data?.company_id,
        "owner_id": this.userData?.data?.owner_id
      }
      console.log("iiiiiiiiiiiiiiiiii", temp)
      this.masterService.addLeaveType(temp).subscribe({
        next: (res: any) => {
          // this.getById()
          this.manageleavetype.getLeaveType()
          this.handleSuccess("Leave Type Added")
          this.reset();
          this.buttonLoader = false
          this.buttondisable = false;
          // var setup = {
          //   "id": this.userData.data.id,
          //   "leave_type_id": res.leaveType.id
          // }
          // this.masterService.updateSetup(setup).subscribe({
          //   next: (res: any) => {
          //     this.appPreference.setObject(this.preferenceKeys.LEAVE_TYPE_ID, res.leaveType.id)
          //   }
          // })
        }, error: (e: any) => {
          this.handleError("Internal Serever Error")
          this.buttonLoader = false;
          this.buttondisable = false
        }
      })
    }
  }

  getById() {
    if (this.userData?.data?.leave_type_id != null || this.userData?.leave_type_id != null) {
      var temp = {
        "id": this.userData?.data?.leave_type_id || this.userData?.leave_type_id
      }

      this.masterService.getById(temp).subscribe({
        next: (res: any) => {
          this.leaveTypeData = res
          console.log("this.leaveTypeData", this.leaveTypeData)
          this.leaveTypeForm.patchValue(res.leave_type.data)
        }, error: (e: any) => {
          console.log("this.leaveTypeData", this.leaveTypeData)
          console.log(e)
        }
      })
    }
  }

  // getLeave(){
  //   var temp = {
  //     "leave_owner_id": this.userData.data.owner_id,
  //     "where": false,
  //     "limit": this.limit,
  //     "offset": this.offset
  //   }
  //   this.masterService.getLeaves(temp).subscribe({
  //     next: (res: any) => {
  //       console.log(res);
  //       this.leaveData = res.leave.rows
  //     }, error: (err: any) => {
  //       this.handleError(err)
  //     }
  //   });
  // }

  getCollorCode(event: any) {
    this.color = event
    console.log("color name", event)
  }

  setupEdit() {
    // var leaveCriteria = [...this.criteriaOptionForm.value]
    this.manageleavetype.editData.subscribe({
      next: (data: any) => {

        console.log("data vlaue", data);
        // return
        console.log("ppppppppppppppppppppppppppp ", data);
        this.id = data.id
        console.log(data)
        this.leaveTypeForm.patchValue(data.data)
        this.leaveTypeForm.get("leave_name")?.patchValue(data.leave_name)
        this.leaveTypeForm.get("no_of_days")?.patchValue(data.no_of_days)
        if (this.disableProrate = false) {
          this.leaveTypeForm.get('LT_13')?.enable();
          this.leaveTypeForm.get('LT_14')?.enable();
        }
        if (this.disableEmpProbation = false) {
          this.leaveTypeForm.get('LT_16')?.enable();
        }
        if (this.disableProbation = false) {
          this.leaveTypeForm.get('LT_17')?.enable();
          this.leaveTypeForm.get('LT_18')?.enable();
        }
        if (this.disableCarryForward = false) {
          this.leaveTypeForm.get('LT_20')?.enable();
          this.leaveTypeForm.get('LT_21')?.enable();
        }
        if (this.disableDays = false) {
          this.leaveTypeForm.get('LT_36')?.enable();
        }
        if(this.leaveTypeForm.get('priviledge')?.value==''){
          this.leaveTypeForm.get('working_days')?.enable();
          this.leaveTypeForm.get('earned_days')?.enable();
        }

        data.leave_amount_criteria.forEach((data: any) => {
          // console.log("data === === ===",data.criteria_option)

          const leaveCriteria: any = this.fb.group({
            criteria_option: data?.criteria_option,
            number_of_leaves: data?.number_of_leaves
          })
          this.criteriaOptionForm.push(leaveCriteria)
        })

      }, error: (e) => {
        this.handleError(e);
        this.reset()
      }
    })
  }

  updateLeaveType() {
    this.buttonLoader = true
    if(this.leaveTypeForm.invalid){
      this.leaveTypeForm.markAllAsTouched();
      this.buttonLoader = false;
    }else{
      var leaveCriteria = [...this.criteriaOptionForm.value]
      delete this.leaveTypeForm.value['formName']
      delete this.leaveTypeForm.value['leave_name']
      delete this.leaveTypeForm.value['no_of_days']
      console.log("deleted update value", this.leaveTypeForm.value)
      this.buttonLoader = true
      var temp = {
        "_id": this.id,
        "leave_name": this.leaveTypeForm.get("leave_name")?.value,
        "no_of_days": this.leaveTypeForm.get('no_of_days')?.value,
        "data": this.leaveTypeForm.value,
        "leave_amount_criteria": leaveCriteria,
        "company_id": 48,
        "owner_id": this.userData?.data?.owner_id
      }
      console.log("temp value", temp)
      this.masterService.editLeaveType(temp).subscribe({
        next: (res: any) => {
          this.manageleavetype.getLeaveType()
          this.handleSuccess("Leave Type Edited Successfully");
          this.reset();
          this.buttonLoader = false
          // this.getById()
        }, error: (e: any) => {
          this.handleError("Internal Serever Error")
        }
      })
    }
  }

  reset() {
    // this.isEdit = false
    this.buttondisable = false
    this.leaveTypeForm.reset();
    this.leaveTypeForm.patchValue({
      "formName": "leaveTypeForm"
    })
    this.manageleavetype.getLeaveType()
    UIkit.modal("#add-leave").hide();
    window.location.reload()
  }

  getError(formGroup: FormGroup, controlName: any) {
    return this.formValidator.getErrorForControl(formGroup, controlName);
  }
}

