import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import Swal from 'sweetalert2';
declare var UIkit: any;
declare var $: any;
@Component({
  selector: 'app-manage-designation',
  templateUrl: './manage-designation.component.html',
  styleUrls: ['./manage-designation.component.scss']
})
export class ManageDesignationComponent implements OnInit, OnDestroy {
  searchText = new FormControl('');
  designationData: any = []
  limit: number = 10
  offset: number = 0
  loader: boolean = false;
  from: number = 0;
  currentPage: number = 1;
  count: any;
  editData = new Subject<any>();
  isEdit: boolean = false;
  preferenceKeys = PreferenceKeys;
  userData: any;
  permission: any;
  accessPermission: any;

  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference
  ) { }


  ngOnDestroy(): void {

    $("#add-designation").remove();
  }
  ngOnInit(): void {
    this.getProfile()
    this.getDesignation()
    this.searchText.valueChanges.subscribe((query: any) => {
      console.log("===query", query)
      this.designationSearch(query)
    })
  }

  designationSearch(data: any) {
    this.loader = true
    var temp = {
      "isDeleted": false,
      "designation_owner_id": this.userData?.data?.owner_id,
      "q": data,
      "limit": this.limit,
      "offset": this.offset
    }
    this.masterService.searchDesignation(temp).subscribe({
      next: (res: any) => {
        this.loader = false
        this.designationData = res.data.rows
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
  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  getDesignation() {
    this.loader = true;

    var temp = {
      "isDeleted": false,
      "limit": this.limit,
      "offset": this.offset,
      "designation_owner_id": this.userData?.data?.owner_id
    }
    this.masterService.getDesignation(temp).subscribe({
      next: (res: any) => {
        this.setData(res.designation.rows)
        this.count = res.designation.count
        this.loader = false;
      },
      error: (err: any) => {
        this.handleError(err)
      }
    })

  }

  openEdit(user: any) {
    this.isEdit = true;
    this.editData.next(user)
    UIkit.modal("#add-designation").show();
  }

  deleteDesignation(data: any) {
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
          "id": data.id,
          "isDeleted": true
        }
        this.masterService.deleteDesigbation(temp).subscribe({
          next: (res: any) => {
            this.loader = false
            Swal.fire(
              'Deleted!',
              'Your Designation has been deleted.',
              'success'
            )
            // this.handleSuccess("Designation Delete Successfully")
            this.getDesignation()
          },
          error: (err: any) => {
            this.handleError(err)
          }
        })
      }
    })
  }

  setData(res: any) {
    this.designationData = res
  }

  onPageChange(event: any) {
    this.currentPage = event > 0 ? event : 1
    this.offset = ((this.currentPage - 1) * this.limit);
    // console.log(event)
    // console.log("1", this.offset)
    // this.currentPage = event
    // this.offset = ((event - 1) * this.limit);
    console.log("2", this.offset)
    this.getDesignation();
  }
}
