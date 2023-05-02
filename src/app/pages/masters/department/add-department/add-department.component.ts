import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { ManageDepartmentComponent } from '../manage-department/manage-department.component';
declare var UIkit: any;

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {
  loader: boolean = false;
  buttonLoader: boolean = false;
  buttondisable = false;
  // @Input('isEdit') isEdit: boolean = false;
  isEdit: any
  id: any
  isDepartmentDone: boolean = true
  preferenceKeys = PreferenceKeys;
  userData: any;
  departmentForm!:FormGroup
  depCodeId: any
  employeeData: any[] = []
  constructor(
    private fb:FormBuilder,
    private formValidator: FormValidator,
    private masterService: MasterServices,
    private appPreference: AppPreference,
    private managedepartment: ManageDepartmentComponent,
    private router: Router
   ) {

    this.initializeForm();
  }

  initializeForm(){
    this.isEdit=false
   this.departmentForm =this.fb.group({
      formName: new FormControl("departmentForm"),
      department_code: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      department_name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      parent_department: new FormControl('', [Validators.pattern('^[a-zA-Z ]*$')]),
      phone_number: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      // manager name is not require field because in first setup manager name field was disappear
      manager_name: new FormControl(''),
      fax: new FormControl(''),
    })


  }

  ngOnInit(): void {
    this.getProfile();
    this.getDepCode();
    this.setupEdit()
    this.getEmployee()
  }

  currentTab: String = "";

  setCurrentTab(currentTab: String) {
    this.currentTab = currentTab;
  }

  getDepCode() {
    var temp = {
      department_owner_id: this.userData?.data?.owner_id,
    };
    this.masterService.getDepCode(temp).subscribe({
      next: (res: any) => {
        // console.log(res.data.length+1);
        if (res.data.length === 0) {
          this.depCodeId = 'dep-' + 1;
        } else {
          var dep_id = res.data.length + 1;
          this.depCodeId = 'dep-' + dep_id;
        }

      },
      error: (e: any) => {
        this.handleError(e.error.message);
      },
    });
  }

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO),
      department: this.appPreference.getObject(PreferenceKeys.DEPARTMENT),
    }
  }
  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
    this.managedepartment.getDepartment();
    this.loader = false;
  }
  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }
  manager: any[] = []
  addDepartment() {
    console.log("hello")
    this.buttonLoader = true;
    if (this.departmentForm.invalid) {
      console.log("this.departmentForm.invalid", this.departmentForm.invalid)
      this.departmentForm.markAllAsTouched()
      this.buttonLoader = false;
    } else {
      console.log("'manager_name'", this.departmentForm.get('manager_name')?.value)
      // var manager = []
      // var data: any = []
      // data = this.departmentForm.get('manager_name')?.value
      // data.forEach((data: any) => {
      //   var temp2 = {
      //     "manager_id": data
      //   }
      //   this.manager.push(temp2)
      // })
      this.buttondisable = true;
      this.buttonLoader = true
      var temp = {
        "department": {
          "department_code": this.departmentForm.get('department_code')?.value,
          "department_name": this.departmentForm.get('department_name')?.value,
          "parent_department": this.departmentForm.get('parent_department')?.value || null,
          "phone_number": this.departmentForm.get('phone_number')?.value,
          "manager_id": this.departmentForm.get('manager_name')?.value || null,
          "fax": this.departmentForm.get('fax')?.value,
          "department_owner_id": this.userData?.data?.owner_id
        }
      }
      console.log(temp)

      this.masterService.addDepartment(temp).subscribe({
        next: (res: any) => {
          this.managedepartment.getDepartment();
          this.handleSuccess("Department Added Successfully!");
          this.reset();
          this.buttonLoader = false
          this.isDepartmentDone = false
          this.buttondisable = false;
          // this.router.navigate(['/manage-department']);
          console.log("user is not first")
          console.log("this.userData?.department", this.userData?.department)
          if (this.userData?.department) {
            console.log("user is first")
            var setup = {
              "id": this.userData.data.id,
              "isDepartment": false
            }
            this.masterService.updateFirstSetup(setup).subscribe({
              next: (res: any) => {
                this.reset();
                this.appPreference.setObject(this.preferenceKeys.DEPARTMENT, false)
                this.router.navigate(["/setting/first-setup"]);
              }
            })
          }
        },
        error: (e: any) => {
          
          this.handleError("Server error")
          this.buttonLoader = false;
          this.buttondisable = false
        }
      })

    }
  }
  reset() {
    // this.isEdit = false
    this.isEdit = this.appPreference.setObject(this.preferenceKeys.ISEDIT, false)
    // this.departmentForm.reset();
    // window.location.reload()
    this.initializeForm();
    this.departmentForm.patchValue({
      "formName": "departmentForm"
    })
    UIkit.modal("#add-department").hide();
    this.managedepartment.getDepartment()
    this.getDepCode()
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

  setupEdit() {
    this.managedepartment.editData.subscribe({
      next: (data: any) => {
        this.id = data.id
        // this.isEdit = true
        console.log("this.userData.isEdit", this.userData.isEdit)
        this.isEdit = this.appPreference.getObject(PreferenceKeys.ISEDIT)
        // this.departmentForm.patchValue(data)
        console.log("data", data)
        this.departmentForm.get('department_code')?.patchValue(data.department_code),
          this.departmentForm.get('department_name')?.patchValue(data.department_name),
          this.departmentForm.get('parent_department')?.patchValue(data.parent_department),
          this.departmentForm.get('phone_number')?.patchValue(data.phone_number),
          this.departmentForm.get('manager_name')?.patchValue(data.manager_id),
          this.departmentForm.get('fax')?.patchValue(data.fax)
      }, error: (e) => {
        this.handleError(e);
        this.reset()
      }
    })
  }

  editDepartment() {
    this.buttonLoader = true
    if (this.departmentForm.invalid) {
      this.departmentForm.markAllAsTouched()
      this.buttonLoader = false;
    } else {
      var temp = {
        dept_id: this.id,
        department: {
          department_code: this.departmentForm.get('department_code')?.value,
          department_name: this.departmentForm.get('department_name')?.value,
          parent_department: this.departmentForm.get('parent_department')?.value,
          phone_number: this.departmentForm.get('phone_number')?.value,
          manager_id: this.departmentForm.get('manager_name')?.value,
          fax: this.departmentForm.get('fax')?.value,
        }
      }
      this.masterService.editDepartment(temp).subscribe({
        next: (res) => {
          this.buttonLoader = false
          this.managedepartment.getDepartment();
          this.handleSuccess("Department Edited successfully");
          this.reset();
        },
        error: (e: any) => {
          this.handleError(e)
        }
      })
    }
  }

  remove() {
    // this.departmentForm.get('manager_name')?.reset()
    console.log(this.departmentForm.get('manager_name')?.value)
  }
}
