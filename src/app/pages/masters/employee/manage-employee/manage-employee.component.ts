import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
declare var UIkit: any;
declare var $: any;

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.scss']
})
export class ManageEmployeeComponent implements OnInit, AfterViewInit, OnDestroy {
  buttonLoader: boolean = false;
  searchText = new FormControl('');

  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference
  ) { }

  ngOnDestroy(): void {
    $("#add-employee").remove();
    $("#assign-package").remove();
    $("#assign-permission").remove();
    $("#assign-shift").remove();
    $("#assign-leave").remove();
    $("#view-documents").remove();
  }

  ngAfterViewInit(): void {

  }
  preferenceKeys = PreferenceKeys;
  loader: boolean = true;
  limit: number = 10
  offset: number = 0
  employeeData: any = []
  loade: Boolean = false
  editData = new Subject<any>();
  editloanData = new Subject<any>();
  packageData = new Subject<any>();
  leaveData = new Subject<any>();
  shiftData = new Subject<any>();
  permissionData = new Subject<any>();
  isEdit: boolean = false;
  permission: any;
  accessPermission: any;
  counts: any
  currentPage: any;
  userData: any;

  ngOnInit(): void {
    this.getProfile();
    this.searchText.valueChanges.subscribe((query: any) => {
      console.log("===query", query)
      this.searchEmployee(query)
    })
  }


  searchEmployee(emp: any) {
    this.loader = true
    var temp = {
      "q": emp,
      "isDeleted": false,
      "isExitDetail": false,
      "user_owner_id": this.userData?.data?.owner_id,
      "limit": this.limit,
      "offset": this.offset
    }
    this.masterService.searchEmployee(temp).subscribe({
      next: (res: any) => {
        this.loader = false
        console.log("====", res.data.count)
        this.employeeData = res.data.rows
        this.counts = res.data.count
      },
      error: (err: any) => {
        if (err.message) {
          this.loader = false
          this.handleError('Server Error')
        }
      }
    })
  }

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }
    this.accessPermission = {
      accessdata: this.appPreference.getObject(PreferenceKeys.ACCESS)
    }
    this.permission = this.accessPermission?.accessdata
    console.warn(this.permission.add_denied_request);
    if (this.userData?.data) {
      this.getEmployee()
    }
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }


  getEmployee() {
    var temp = {
      "isDeleted": false,
      "limit": this.limit,
      "offset": this.offset,
      "user_owner_id": this.userData?.data?.owner_id,
      "isExitDetail": false
    }
    console.log("getEmployee", temp, this.currentPage, this.offset);

    this.masterService.getEmployee(temp).subscribe({
      next: (res: any) => {
        console.log(res)
        this.counts = res.employee.count
        this.employeeData = res.employee.rows
        this.loader = false
      },
      error: (err: any) => {
        if (err.message) {
          this.loader = false
          this.handleError('Server Error')
        }

      }
    })

  }

  onPageChange(event: any) {
    this.currentPage = event > 0 ? event : 1
    this.offset = ((this.currentPage - 1) * this.limit);
    // this.getProfile();
    this.getEmployee();
  }


  openEdit(user: any) {
    this.isEdit = true;
    this.editData.next(user)
    UIkit.modal("#add-employee").show();
  }
  openLoadEdit(user: any) {
    console.log("=========", user)
    this.isEdit = true;
    this.editloanData.next(user)
    UIkit.modal("#record-loan").show();
  }

  openAssignPackage(data: any) {
    console.log("-=-=-=", data)
    UIkit.modal("#assign-package").show();
    this.packageData.next(data)
  }

  openAssignLeave(data: any) {
    UIkit.modal("#assign-leave").show();
    this.leaveData.next(data.id)
  }

  openAssignShift(data: any) {
    console.log("1254639870", data)
    UIkit.modal("#assign-shift").show();
    this.shiftData.next(data)
  }

  openAssignPermission(data: any) {
    console.log("=======", data)
    UIkit.modal("#assign-permission").show();
    this.permissionData.next(data)
  }

  viewDocuments(data: any) {
    console.log("=======", data)
    UIkit.modal("#view-documents").show();
    this.permissionData.next(data)
  }

  deleteEmployee(user: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this Record ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.loader = true

        var temp = {
          "id": user.id,
          "isDeleted": true
        }
        this.masterService.deleteEmployee(temp).subscribe({
          next: (res: any) => {
            this.loader = false
            // this.handleSuccess("Employee Delete Successfully")
            Swal.fire(
              'Deleted!',
              'Your Employee has been deleted.',
              'success'
            )
            this.getEmployee()
          },
          error: (err: any) => {
            this.handleError("Server Error")
          }
        })
      }
    })


  }




}
