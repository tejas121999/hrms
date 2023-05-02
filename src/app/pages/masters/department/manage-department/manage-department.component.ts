import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PaginationInstance } from 'ngx-pagination';
import { Subject } from 'rxjs';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import Swal from 'sweetalert2';
declare var UIkit: any;
declare var $: any;

@Component({
  selector: 'app-manage-department',
  templateUrl: './manage-department.component.html',
  styleUrls: ['./manage-department.component.scss']
})
export class ManageDepartmentComponent implements OnInit, OnDestroy {
  searchText = new FormControl('');
  loader: boolean = false;
  departmentData: any = []
  limit: number = 10
  offset: number = 0
  from: number = 0;
  currentPage: number = 1;
  count: any;
  editData = new Subject<any>();
  // isEdit: boolean = false;
  preferenceKeys = PreferenceKeys;
  userData: any;
  permission: any;
  accessPermission: any;

  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference
  ) { }

  ngOnDestroy(): void {
    $("#add-department").remove();
  }

  ngOnInit(): void {
    this.setIsEdit()
    this.getProfile()
    this.getDepartment()
    this.searchText.valueChanges.subscribe((query: any) => {
      console.log("===query", query)
      this.searchDepartment(query)
    })
  }

  searchDepartment(dept: any) {
    this.loader = true
    var temp = {
      "isDeleted": false,
      "department_owner_id": this.userData?.data?.owner_id,
      "q": dept,
      "limit": this.limit,
      "offset": this.offset
    }
    this.masterService.searchDepartment(temp).subscribe({
      next: (res: any) => {
        this.loader = false
        console.log(res.data.rows)
        this.departmentData = res.data.rows
        this.count = res.data.count
      }, error: (err: any) => {
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
  }


  setIsEdit() {
    this.appPreference.setObject(this.preferenceKeys.ISEDIT, false)
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  getDepartment() {
    this.loader = true;

    var temp = {
      "where": false,
      "limit": this.limit,
      "offset": this.offset,
      "department_owner_id": this.userData?.data?.owner_id
    }
    this.masterService.getDepartment(temp).subscribe({
      next: (res: any) => {
        console.log(res)
        this.count = res.department.count
        this.setData(res.department)
        this.loader = false;
      },
      error: (err) => {
        this.handleError(err)
      }
    })


  }

  openEdit(user: any) {
    this.appPreference.setObject(this.preferenceKeys.ISEDIT, true)
    // this.isEdit = true;
    this.editData.next(user)
    UIkit.modal("#add-department").show();
  }

  deleteDepartment(data: any) {
    var temp: any
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this Record ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.loader = true;
        temp = {
          "id": data.id,
          "isDeleted": true
        }
        this.masterService.deleteDepartment(temp).subscribe({
          next: (res: any) => {
            this.loader = false
            Swal.fire(
              'Deleted!',
              'Your Department has been deleted.',
              'success'
            )
            this.getDepartment()
          },
          error: (err: any) => {
            this.handleError("Server Error")
          }
        })

      }
    })


    this.masterService.deleteDepartment(temp).subscribe({
      next: (res: any) => {
        this.loader = false
        this.handleSuccess("Employee Delete Successfully")
        this.getDepartment()
      },
      error: (err: any) => {
        this.handleError(err)
      }
    })
  }


  setData(res: any) {
    this.departmentData = res.rows
  }


  // Pagination
  onPageChange(event: any) {
    this.currentPage = event
    this.offset = ((event - 1) * this.limit);
    this.getDepartment();
  }
}
