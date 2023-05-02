import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { ManagePackageComponent } from '../manage-package/manage-package.component';
declare var UIkit: any;

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.scss']
})
export class AddPackageComponent implements OnInit, OnChanges {
  @Input('isEdit') isEdit: boolean = false;
  @Input('addItem') addItem: boolean = false
  // rows = [{noQuestion : 0}];
  preferenceKeys = PreferenceKeys;
  items: Array<any> = [];
  newItem: any = {};
  salaryComponent: any[] = [];
  salaryComponentData: any[] = [];
  leaveData: any[] = []
  i: any
  addNewPackageData: any[] = []
  temp2: any = {}
  temp3: any = {}
  addNewleaveData: any[] = []
  leaveIndex: any
  buttondisable = false
  package_id: any
  leaveDeleteId: any
  editPackageID: any
  index: any
  deletePackageID: any
  scip__id: any
  package_Type: any = 'Annual'
  userData: any;

  row = [
    {
      name: '',
      type: '',
      value: '',
      quantity: '',
      total: '',
    }
  ]

  packageType: any = [
    { "type": "Percentage" },
    { "type": "Rupees" }
  ];
  totalYearlyValue: any = 0;
  invalidYearlyValue: boolean = false;
  Deduction: any[] = []
  Earnings: any[] = []


  constructor(
    private fb: FormBuilder,
    private formValidator: FormValidator,
    private masterService: MasterServices,
    private appPreference: AppPreference,
    private managePackage: ManagePackageComponent
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.addItem) {
      this.addItems()
      this.addLeave()

    }
  }

  getError(formGroup: FormGroup, controlName: any) {
    // console.log("formGroup", formGroup, "controlName", controlName)
    return this.formValidator.getErrorForControl(formGroup, controlName);
  }

  generalPackageForm = new FormGroup({
    formName: new FormControl("attendanceForm"),
    package_name: new FormControl("", [Validators.required]),
    annual_ctc: new FormControl(0, [Validators.required, Validators.maxLength(5)]),
    package_type: new FormControl("",),
    overtime_daily_rate: new FormControl("", [Validators.required]),
    overtime_hourly_rate: new FormControl("", [Validators.required])
  })

  myForm: FormGroup = this.fb.group({
    anualPackage: this.fb.array([])
  })

  leaveForm: FormGroup = this.fb.group({
    leavePackage: this.fb.array([])
  })


  ngOnInit(): void {
    this.getProfile()
    this.setupEdit()
    this.getSalaryComponent()
  }

  get anualPackageForm() {
    return this.myForm.get('anualPackage') as FormArray
  }

  get leavePackageForm() {
    return this.leaveForm.get('leavePackage') as FormArray
  }

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }
  }



  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  removeItem(i: any) {
    if (this.anualPackageForm?.controls.length > 1) {
      this.anualPackageForm.removeAt(i)
      this.calculateTotalYearlyValue();
    } else {
      this.handleError("You Can't Delete 1st Row")
    }

  }
  addItems() {
    if (this.isEdit && this.addNewPackageData.length < 1) {
      const annualPackageComponents: any = this.fb.group({
        salary_component_name: ['', Validators.required],
        type: ['', Validators.required],
        value: ['', Validators.required],
        actual: [],
        deduction: [],
        monthly_value: [],
        yearly_value: []
      })
      this.anualPackageForm.push(annualPackageComponents)

      this.anualPackageForm.disable()

      // this.addNewPackageData.push(this.anualPackageForm.value)
      if (this.isEdit == true) {
        var new_array = this.anualPackageForm.value[this.anualPackageForm.value.length - 1]
        this.i = this.anualPackageForm.value.length - 1
        this.addNewPackageData.push(new_array)
      }
    } else if (this.addNewPackageData.length >= 1) {
      this.handleError("Please add one item at a time")
    }

    if (!this.isEdit) {
      const annualPackageComponents = this.fb.group({
        salary_component_name: ['', Validators.required],
        type: ['', Validators.required],
        value: ['', Validators.required],
        actual: [],
        deduction: [],
        monthly_value: [],
        yearly_value: []
      })
      this.anualPackageForm.push(annualPackageComponents)
    }
    this.calculateTotalYearlyValue();
  }


  addLeave() {
    const leavePackageComponent = this.fb.group({
      leave_id: [],
      number_days: []
    })
    this.leavePackageForm.push(leavePackageComponent)
    if (this.isEdit == true) {
      var new_array = this.leavePackageForm.value[this.leavePackageForm.value.length - 1]
      this.leaveIndex = this.leavePackageForm.value.length - 1
      this.addNewleaveData.push(new_array)
    }
  }

  showEdit: boolean = false
  scip_idData: any[] = []
  updatePackageById(i: any, scip_id: any) {

  }

  openEdit(i: any) {
    console.log(i)
    this.index = i
    this.showEdit = true
    if (this.anualPackageForm?.controls[i].disabled) {
      this.anualPackageForm?.controls[i].enable()
      this.showEdit = true
    } else {
      this.anualPackageForm?.controls[i].disable()
    }
  }

  closeEdit() {
    this.showEdit = false
    if (this.anualPackageForm?.controls[this.index].disabled) {
      this.anualPackageForm?.controls[this.index].enable()
      this.showEdit = true
      console.log()
    } else {
      this.anualPackageForm?.controls[this.index].disable()
      this.showEdit = false
    }
  }

  packageTypeChange() {
    if (this.generalPackageForm.get("package_type")?.touched && this.isEdit) {
      this.generalPackageForm.get('annual_ctc')?.reset()
      this.anualPackageForm.clear()
    }

    this.generalPackageForm.get("package_type")?.valueChanges.subscribe((data: any) => {
      this.package_Type = data
    })
  }

  // todo 
  ctcChange(event: any) {
    console.log(event)
    this.anualPackageForm.controls.forEach((data: any, index: any) => {

      // console.log(i)
      console.log(data)
      var value = this.anualPackageForm?.controls[index]?.value?.value
      // var value = data;
      if (value?.controls?.type?.value == 'Percentage') {
        console.log(index)
        var CTC: any = this.generalPackageForm.get('annual_ctc')?.value
        var yearly_value: any = (value / 100) * CTC
        var monthly_value: any = yearly_value / 12
        monthly_value = Math.round(monthly_value)
        this.anualPackageForm?.controls[index]?.get('actual')?.setValue(value)
        this.anualPackageForm?.controls[index]?.get('deduction')?.setValue(value)
        this.anualPackageForm?.controls[index]?.get('yearly_value')?.setValue(yearly_value)
        this.anualPackageForm?.controls[index]?.get('monthly_value')?.setValue(monthly_value)
      } else if (value?.controls?.type?.value == 'Rupees') {
        var yearly_value_Rupes: any = event * 12
        this.anualPackageForm?.controls[index]?.get('actual')?.setValue(value)
        this.anualPackageForm?.controls[index]?.get('deduction')?.setValue(value)
        this.anualPackageForm?.controls[index]?.get('yearly_value')?.setValue(yearly_value_Rupes)
        this.anualPackageForm?.controls[index]?.get('monthly_value')?.setValue(value)
      }
    });
    this.calculateTotalYearlyValue();
  }

  typeChange(event: any, i: any) {
    if (this.isEdit) {
      var value = this.anualPackageForm?.controls[i]?.value.value
      if (event.type == 'Percentage') {
        var CTC: any = this.generalPackageForm.get('annual_ctc')?.value
        var yearly_value: any = (value / 100) * CTC
        var monthly_value: any = yearly_value / 12
        monthly_value = Math.round(monthly_value)
        this.anualPackageForm?.controls[i]?.get('actual')?.setValue(value)
        this.anualPackageForm?.controls[i]?.get('deduction')?.setValue(value)
        this.anualPackageForm?.controls[i]?.get('yearly_value')?.setValue(yearly_value)
        this.anualPackageForm?.controls[i]?.get('monthly_value')?.setValue(monthly_value)
      } else if (event.type == 'Rupes') {
        var yearly_value_Rupes: any = value * 12
        this.anualPackageForm?.controls[i]?.get('actual')?.setValue(value)
        this.anualPackageForm?.controls[i]?.get('deduction')?.setValue(value)
        this.anualPackageForm?.controls[i]?.get('yearly_value')?.setValue(yearly_value_Rupes)
        this.anualPackageForm?.controls[i]?.get('monthly_value')?.setValue(value)
      }
    }
    this.calculateTotalYearlyValue();
  }

  annualPackage(event: any, i: any) {
    if (this.anualPackageForm?.controls[i]?.get('type')?.value == 'Percentage') {
      var CTC: any = this.generalPackageForm.get('annual_ctc')?.value
      var yearly_value: any = (event / 100) * CTC
      var monthly_value: any = yearly_value / 12
      monthly_value = Math.round(monthly_value)
      this.anualPackageForm?.controls[i].get('actual')?.setValue(event)
      this.anualPackageForm?.controls[i].get('deduction')?.setValue(event)
      this.anualPackageForm?.controls[i].get('yearly_value')?.setValue(yearly_value)
      this.anualPackageForm?.controls[i].get('monthly_value')?.setValue(monthly_value)
    } else if (this.anualPackageForm?.controls[i].get('type')?.value == 'Rupees') {
      var yearly_value_Rupes: any = event * 12
      this.anualPackageForm?.controls[i].get('actual')?.setValue(event)
      this.anualPackageForm?.controls[i].get('deduction')?.setValue(event)
      this.anualPackageForm?.controls[i].get('yearly_value')?.setValue(yearly_value_Rupes)
      this.anualPackageForm?.controls[i].get('monthly_value')?.setValue(event)
    }
    this.calculateTotalYearlyValue();
  }



  // getLevave() {
  //   var temp = {
  //     "where": false,
  //     "limit": 1000,
  //     "offset": 0,
  //     "leave_owner_id": this.userData?.data?.owner_id
  //   }
  //   this.masterService.getLeave(temp).subscribe({
  //     next: (res: any) => {
  //       this.leaveData = res?.leave?.rows
  //     }, error: (err: any) => {
  //       this.handleError(err)
  //     }
  //   })
  // }




  // todo changes this 


  getLeaveDay(i: any) {
    var temp = {
      "id": this.leavePackageForm?.controls[i]?.value?.leave_id
    }
    this.masterService.getLeaveById(temp).subscribe({
      next: (res: any) => {
        this.leavePackageForm.controls[i].get('number_days')?.setValue(res.leave.no_of_days)
      }, error: (e: any) => {
        this.handleError('error')
      }
    })
  }





  deletePackage(i: any, component_id: any) {
    console.log(component_id?.controls?._id?.value)
    if (component_id?.controls?._id?.value == undefined) {
      this.anualPackageForm.removeAt(i);
      this.calculateTotalYearlyValue()
      this.addNewPackageData = []
    } else {
      var temp = {
        "id": component_id?.controls?._id?.value
      }
      this.masterService.removeComponentFromPackage(temp).subscribe({
        next: (res: any) => {
          this.handleSuccess("Deleted Successfully")
          this.anualPackageForm.removeAt(i)
          this.addNewPackageData = []
          // this.reset()
        }, error: (err: any) => {
          this.handleError("Error")
        }
      })
    }
  }




  // addPackage() {
  //   if (this.generalPackageForm.invalid) {
  //     this.generalPackageForm.markAllAsTouched()
  //   } else {
  //     this.buttondisable = true
  //     var temp = {
  //       "package": {
  //         "package_owner_id": this.userData.data.owner_id,
  //         "package_name": this.generalPackageForm.get('package_name')?.value,
  //         "annual_ctc": this.generalPackageForm.get('annual_ctc')?.value,
  //         "overtime_daily_rate": this.generalPackageForm.get('overtime_daily_rate')?.value,
  //         "overtime_hourly_rate": this.generalPackageForm.get('overtime_hourly_rate')?.value,
  //         "package_type": this.generalPackageForm.get('package_type')?.value
  //       },
  //       "salary_component": this.anualPackageForm.value,
  //       "leaves": this.leavePackageForm.value
  //     }

  //     this.masterService.addPackage(temp).subscribe({
  //       next: (res: any) => {
  //         this.handleSuccess("package added successfully")
  //         this.reset()
  //         this.buttondisable = false

  //       }, error: (err: any) => {
  //         this.buttondisable = false

  //         this.handleError("error")
  //       }
  //     })
  //   }

  // }





  getOnePackage() {
    var temp = {
      "package_id": this.package_id
    }
    this.masterService.getOnePackage(temp).subscribe({
      next: (res: any) => {
        res.components.forEach((data: any) => {
          this.editPackageID = data?.scip_id
          this.deletePackageID = data?._id
          const column = this.fb.group({
            _id: data._id,
            salary_component_name: data?.scip_id,
            type: data?.type,
            value: data?.value,
            actual: data?.actual,
            deduction: data?.deduction,
            monthly_value: data?.monthly_value,
            yearly_value: data?.yearly_value
          })
          this.anualPackageForm.push(column)
          this.anualPackageForm.disable()
        })
        res.leaves.forEach((data: any) => {
          this.leaveDeleteId = data?.lip_id
          const leave = this.fb.group({
            lip_id: data?.lip_id,
            leave_id: data?.id,
            number_days: data?.no_of_days
          })
          this.leavePackageForm.push(leave)
        })
      }, error: (e: any) => {
        this.handleError("error")
      }
    })
  }

  selectComponent(event: any) {
    console.log(event);
    console.log(this.salaryComponent);
    let index = this.salaryComponent.findIndex(ele => ele.id == event.id);
    console.log(index);
    if (index != -1) {
      this.salaryComponent.splice(index, 1);
    }
  }

  calculateTotalYearlyValue() {
    this.totalYearlyValue = 0;

    this.anualPackageForm.controls.forEach((data: any, index: any) => {
      if (this.totalYearlyValue < Number(this.generalPackageForm.get('annual_ctc')?.value)) {
        this.invalidYearlyValue = false;
        this.totalYearlyValue = this.totalYearlyValue + this.anualPackageForm?.controls[index]?.get('yearly_value')?.value;
        if (this.totalYearlyValue > Number(this.generalPackageForm.get('annual_ctc')?.value)) {
          this.invalidYearlyValue = true;
        }
      } else {
        this.invalidYearlyValue = true
      }
    });
  }


  // new code================================================================
  monthly_value: any
  yearly_value: any
  calculate_type: any
  total_Yearly: any
  total_monthly: any
  comp_yearly_cost: any
  comp_monthly_cost: any
  monthly_array: any[] = []
  yearly_array: any[] = []
  deductionComponent: any[] = []
  salary_Component: any[] = []
  delete_component: any[] = []
  ctc: any

  getBasicSalaryComponent() {
    var temp = {
      "isDeleted": false,
      "component_owner_id": this.userData?.data?.owner_id,
    }
    this.masterService.getBasicSalaryComponent(temp).subscribe({
      next: (res: any) => {

      }
    })
  }

  getSalaryComponent() {
    var temp = {
      "isDeleted": false,
      "limit": 10000,
      "offset": 0,
      "component_owner_id": this.userData?.data?.owner_id,
      "component_type": [
        "Deduction"
      ]
    }
    this.masterService.getSalaryComp(temp).subscribe({
      next: (res: any) => {
        this.Deduction = res?.salaryComponent?.rows;
        console.log("this.Deduction", this.Deduction)
        this.salaryComponentData = res?.salaryComponent?.rows
      }
    })

    var temp2 = {
      "isDeleted": false,
      "limit": 10000,
      "offset": 0,
      "component_owner_id": this.userData?.data?.owner_id,
      "component_type": [
        "Earnings"
      ]
    }

    this.masterService.getSalaryComp(temp2).subscribe({
      next: (res: any) => {
        this.Earnings = res?.salaryComponent?.rows;
        console.log("it will call first")
      }
    })
  }

  earningsForm: FormGroup = this.fb.group({
    earning: this.fb.array([])
  })

  get earningsComponent() {
    return this.earningsForm.get('earning') as FormArray
  }

  async addEarnings(data: any) {
    const index = this.Earnings.findIndex((obj: any) => obj.id === data.id)
    if (index !== -1) {
      this.Earnings.splice(index, 1)
    }
    console.log("this.Earnings", this.Earnings)
    var monthly_value: any
    var calculation_value: any
    var yearly_value: any
    this.ctc = this.generalPackageForm.get("annual_ctc")?.value
    this.i = this.earningsComponent.value.length - 1
    const earnings: any = this.fb.group({
      salary_component_name: data?.id,
      component_name: data?.salary_component_name,
      calculation_type: data?.calculation_type,
      type: data?.calculate_value,
      monthly_value: [''],
      yearly_value: ['']
    })
    this.earningsComponent.push(earnings)
    this.earningsComponent.value.forEach((data: any, index: any) => {
      if (data.calculation_type === "Percentage") {
        calculation_value = data?.type
        yearly_value = (calculation_value / 100) * this.ctc
        monthly_value = yearly_value / 12
        monthly_value = Math.round(monthly_value)
        yearly_value = Math.round(yearly_value)
        this.earningsComponent?.controls[index]?.get("monthly_value")?.setValue(monthly_value)
        this.earningsComponent?.controls[index]?.get('yearly_value')?.setValue(yearly_value)
        // this.calculateTotal(data.monthly_value, data.yearly_value, ctc, data.calculation_type)
      } else if (data.calculation_type === "Amount") {
        yearly_value = data?.type * 12
        this.earningsComponent?.controls[index]?.get('yearly_value')?.setValue(yearly_value)
        this.earningsComponent?.controls[index]?.get("monthly_value")?.setValue(data?.type)
      }
    })
    if (!this.isEdit) {
      this.earningsComponent.value.forEach((data: any) => {
        this.calculate_type = data.calculation_type
        this.monthly_value = data.monthly_value
        this.yearly_value = data.yearly_value
      })
      this.monthly_array.push(this.monthly_value)
      this.yearly_array.push(this.yearly_value)
      this.calculateTotal()
      console.log("this console will not be appear")
    }
  }

  addPackage() {
    var temp = {
      "package": {
        "package_owner_id": this.userData.data.owner_id,
        "package_name": this.generalPackageForm.get('package_name')?.value,
        "annual_ctc": this.generalPackageForm.get('annual_ctc')?.value,
        "package_type": this.generalPackageForm.get('package_type')?.value,
      },
      "salary_component": this.earningsComponent.value
    }
    this.masterService.addPackage(temp).subscribe({
      next: (res: any) => {
        this.handleSuccess("Package Created Successfully")
        this.reset()
      }, error: (err: any) => {
        this.handleError("server error")
      }
    })
  }

  setupEdit() {
    this.managePackage.editData.subscribe({
      next: (data: any) => {
        this.ctc = data?.annual_ctc
        this.generalPackageForm.patchValue(data)
        this.package_id = data.id
        this.isEdit = true
        this.getPackageInfo()
      }, error: (e: any) => {
        this.handleError(e);
        this.reset()
      }
    })
  }

  getPackageInfo() {
    var temp = {
      "package_id": this.package_id
    }
    this.masterService.getPackageInfo(temp).subscribe({
      next: (res: any) => {
        console.log(res.package)
        res.package.forEach((data: any) => {
          const earnings: any = this.fb.group({
            "_id": data.id,
            "salary_component_name": data.salary_component_name,
            "component_name": data.salary_component_data.salary_component_name,
            "calculation_type": data.calculation_type,
            "type": data.type,
            "monthly_value": data.monthly_value,
            "yearly_value": data.yearly_value,
          })
          // this.addEarnings(_data)
          this.earningsComponent.push(earnings)
          if (this.isEdit) {
            console.log("this console will appear")
            this.earningsComponent.value.forEach((data: any) => {
              this.calculate_type = data.calculation_type
              this.monthly_value = data.monthly_value
              this.yearly_value = data.yearly_value
            })
            this.monthly_array.push(this.monthly_value)
            this.yearly_array.push(this.yearly_value)
            this.calculateTotal()
          }
        })
      }, error: (err: any) => {
        this.handleError("server error")
      }
    })
  }

  deleteComponent(i: any, data: any) {
    this.delete_component.push(data.value._id)
    console.log("this.delete_component", this.delete_component)
    this.earningsComponent.removeAt(i)
    this.monthly_array = []
    this.yearly_array = []
    console.log("this.earningsComponent.value", this.earningsComponent.value)
    this.earningsComponent.value.forEach((data: any) => {
      this.calculate_type = data.calculation_type
      this.monthly_value = data.monthly_value
      this.yearly_value = data.yearly_value
    })
    this.monthly_array.push(this.monthly_value)
    this.yearly_array.push(this.yearly_value)
    this.calculateTotal()
    // ask arron about this
    // this.getSalaryComponent()
    // console.log("data.value._id", data.value.salary_component_name)
    // console.log("this.Earnings mane", this.Earnings)
    // const index = this.Earnings.findIndex((obj: any) => obj.id === data.value.salary_component_name)
    // if (index !== -1) {
    //   this.Earnings.splice(index, 1)
    // }
    // console.log("this.Earnings updated", this.Earnings)
  }

  updatePackage() {
    console.log(this.package_id)
    var temp = {
      "package": {
        "id": this.package_id,
        "package_name": this.generalPackageForm.get('package_name')?.value,
        "annual_ctc": this.generalPackageForm.get('annual_ctc')?.value,
        "package_type": this.generalPackageForm.get('package_type')?.value,
      },
      "salary_component": this.earningsComponent.value,
      "delete_component": this.delete_component
    }
    console.log(temp)
    this.masterService.updatePackage(temp).subscribe({
      next: (res: any) => {
        this.handleSuccess("Package Update Successfully")
        this.reset()
      }, error: (err: any) => {
        this.handleError("server error")
      }
    })
  }

  calculateTotal() {
    console.log("this.ctc 8", this.ctc)
    // if (!this.isEdit) {
    //   this.monthly_array.push(this.monthly_value)
    //   this.yearly_array.push(this.yearly_value)
    // }
    // console.log(" this.monthly_array", this.monthly_array)
    // console.log(" this.yearly_array", this.yearly_array)
    if (this.monthly_array.length != 1 && this.yearly_array.length != 1) {
      var monthly_sum: number = 0
      var yearly_sum: number = 0
      for (let i = 0; i < this.monthly_array.length; i++) {
        this.monthly_array[i] = parseInt(this.monthly_array[i])
        monthly_sum += this.monthly_array[i]
      }
      this.total_monthly = monthly_sum
      for (let i = 0; i < this.yearly_array.length; i++) {
        this.yearly_array[i] = parseInt(this.yearly_array[i])
        yearly_sum += this.yearly_array[i]
      }
      this.total_Yearly = yearly_sum
    } else {
      this.total_monthly = this.monthly_value
      this.total_Yearly = this.yearly_value
    }
    console.log("this.monthly_array 7", this.monthly_array)
    console.log("this.yearly_array 8", this.yearly_array)
    this.monthly_array.forEach((data: any, index: any) => {
      this.monthly_array[index] = parseInt(this.monthly_array[index])
      this.comp_monthly_cost = this.ctc - this.monthly_array[index]
      console.log("this.ctc 1", this.ctc)
      console.log("this.monthly_array[index] 2", this.monthly_array[index])
      console.log("this.ctc - this.monthly_array[index] 3", this.ctc - this.monthly_array[index])
    })
    this.yearly_array.forEach((data: any, index: any) => {
      this.yearly_array[index] = parseInt(this.yearly_array[index])
      this.comp_yearly_cost = this.ctc - this.yearly_array[index]
      console.log("this.ctc 4", this.ctc)
      console.log("this.yearly_array[index] 5", this.yearly_array[index])
      console.log("this.ctc - this.yearly_array[index] 6", this.ctc - this.yearly_array[index])
    })
  }

  reset() {
    this.isEdit = false
    this.addItem = false
    this.earningsComponent.clear()
    this.generalPackageForm.reset()
    this.monthly_array = []
    this.yearly_array = []
    UIkit.modal("#add-package").hide();
    this.managePackage.getPackage()
    this.generalPackageForm.patchValue({
      "formName": "generalPackageForm"
    })
    this.delete_component = []
  }

  // todo task
  anualCTC(event: any) {
    this.ctc = event
    var monthly_value: any
    var calculation_value: any
    var yearly_value: any
    this.earningsComponent.value.forEach((data: any, index: any) => {
      if (data.calculation_type === "Percentage") {
        calculation_value = data?.type
        yearly_value = (calculation_value / 100) * this.ctc
        monthly_value = yearly_value / 12
        monthly_value = Math.round(monthly_value)
        yearly_value = Math.round(yearly_value)
        this.earningsComponent?.controls[index]?.get("monthly_value")?.setValue(monthly_value)
        this.earningsComponent?.controls[index]?.get('yearly_value')?.setValue(yearly_value)
        // this.calculateTotal(data.monthly_value, data.yearly_value, ctc, data.calculation_type)
      } else if (data.calculation_type === "Amount") {
        yearly_value = data?.type * 12
        this.earningsComponent?.controls[index]?.get('yearly_value')?.setValue(yearly_value)
        this.earningsComponent?.controls[index]?.get("monthly_value")?.setValue(data?.type)
      }


    })
    this.earningsComponent.value.forEach((data: any) => {
      this.calculate_type = data.calculation_type
      this.monthly_value = data.monthly_value
      this.yearly_value = data.yearly_value
    })
    this.monthly_array.push(this.monthly_value)
    this.yearly_array.push(this.yearly_value)
    this.calculateTotal()
  }
}



