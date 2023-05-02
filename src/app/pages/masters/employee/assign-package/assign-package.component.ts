import { Component, OnInit } from '@angular/core';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { ManageEmployeeComponent } from '../manage-employee/manage-employee.component';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
declare var UIkit: any;

@Component({
  selector: 'app-assign-package',
  templateUrl: './assign-package.component.html',
  styleUrls: ['./assign-package.component.scss']
})
export class AssignPackageComponent implements OnInit {
  count: any;
  from: number = 0;
  limit: number = 10
  offset: number = 0;
  loader: boolean = false;
  package_Data: any[] = [];
  currentPage: number = 1;
  empPackage: any[] = []
  empId: any
  package: any
  packageID: any[] = []
  preferenceKeys = PreferenceKeys;
  userData: any;
  constructor(
    private masterServices: MasterServices,
    private appPreference: AppPreference,
    private ManageEmployee: ManageEmployeeComponent
  ) { }

  getPackageForm = new FormGroup({
    formName: new FormControl("getPackageForm"),
    getPackage: new FormControl('')
  })

  ngOnInit(): void {
    this.getProfile()
    this.getEmpID()
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

  getPackages() {
    this.loader = true;
    var temp = {
      "isDeleted": false,
      "limit": this.limit,
      "offset": this.offset,
      "package_owner_id": this.userData?.data?.owner_id
    }
    this.masterServices.getPackage(temp).subscribe({
      next: (res: any) => {
        this.loader = false;
        this.count = res.package.count
        this.package_Data = res.package.rows
        this.package_Data.forEach((data: any, index: any) => {
          console.log("package data===", data)
          var temp = {
            "id": data?.id,
            "annual_ctc": data?.annual_ctc,
            "package_name": data?.package_name,
            "package_type": data?.package_type,
            "packageCheck": this.packID === data.id
          }
          this.package_Data[index] = temp
        })
        console.log("this.package_Data", this.package_Data)
      }, error: (err) => {
        this.handleError('Server Error')
      }
    })
  }

  temp: any = {
    "id": '',
    "emp_package": ''
  }
  paylodae: any[] = []
  getPackageID(id: any) {
    console.log(id)
    this.temp = {
      "id": this.empId,
      "emp_package": id
    }
  }

  assignPackage() {
    console.log('Dppaoddnkjnjdnj  ', this.temp);

    this.loader = true
    this.masterServices.assignPackage(this.temp).subscribe({
      next: (res: any) => {
        this.loader = false
        this.handleSuccess("Assign Package Successfully")
        this.reset()
      }, error: (err: any) => {
        this.handleError('Server Error')
      }
    })
  }
  packID: any
  getEmpID() {
    this.ManageEmployee.packageData.subscribe({
      next: (data: any) => {
        console.log(data)
        this.empId = data.id
        this.packID = data.emp_package
        this.getPackages()
      }
    })
  }

  reset() {
    UIkit.modal("#assign-package").hide();
    this.getPackages()
    this.ManageEmployee.getEmployee()
  }

  onPageChange(event: any) {
    console.log(event)
    this.currentPage = event > 0 ? event : 1
    this.offset = ((this.currentPage - 1) * this.limit);
    this.getPackages()
  }


}
