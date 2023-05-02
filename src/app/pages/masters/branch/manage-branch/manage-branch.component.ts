import { Component, OnDestroy, OnInit } from '@angular/core';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
declare var UIkit: any;
declare var $: any;
@Component({
  selector: 'app-manage-branch',
  templateUrl: './manage-branch.component.html',
  styleUrls: ['./manage-branch.component.scss']
})
export class ManageBranchComponent implements OnInit, OnDestroy {
  editData = new Subject<any>();
  searchText = new FormControl('');
  branchData: any = [];
  currentPage: number = 1;
  count: any;
  from: number = 0;
  limit: number = 10
  offset: number = 0
  loader: boolean = false;
  isEdit: boolean = false;
  preferenceKeys = PreferenceKeys;
  userData: any;

  constructor(
    private masterServices: MasterServices,
    private appPreference: AppPreference,
  ) { }


  ngOnInit(): void {
    this.setIsEdit()
    this.getProfile()
    this.getBranch();
    this.searchText.valueChanges.subscribe((query: any) => {
      console.log("===query", query)
      this.searchBranch(query)
    })
  }
  ngOnDestroy(): void {
    $("#add-branch").remove();
  }

  searchBranch(data: any) {
    var temp = {
      "isDeleted": false,
      "limit": this.limit,
      "offset": this.offset,
      "branch_owner_id": this.userData?.data?.owner_id,
      "q": data
    }

    this.masterServices.searchBranch(temp).subscribe({
      next: (response: any) => {
        console.log("response", response)
        this.setData(response);
        this.loader = false;
        this.branchData = response.data.rows
        this.count = response.data.count
      },
      error: (err) => {
        this.handleError(err)
      }
    })
  }
  setIsEdit() {
    this.appPreference.setObject(this.preferenceKeys.ISEDIT, false)
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

  onPageChange(event: any) {
    this.currentPage = event
    this.offset = ((event - 1) * this.limit);
    this.getBranch();
  }

  getBranch() {
    this.loader = true;
    var temp = {
      "where": false,
      "limit": this.limit,
      "offset": this.offset,
      "branch_owner_id": this.userData?.data?.owner_id
    }
    this.masterServices.getBranch(temp).subscribe({
      next: (response: any) => {
        console.log("response", response)
        this.setData(response);
        this.loader = false;
        this.count = response.branch.count
      },
      error: (err) => {
        this.handleError(err)
      }
    })
  }

  openEdit(data: any) {
    this.appPreference.setObject(this.preferenceKeys.ISEDIT, true)
    this.editData.next(data)
    UIkit.modal("#add-branch").show();
  }

  deleteBranch(data: any) {
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
        this.loader = true
        var temp = {
          "id": data.id,
          "isDeleted": true
        }
        this.masterServices.deleteBranch(temp).subscribe({
          next: (res: any) => {
            this.handleSuccess("Deleted Successfully")
            this.getBranch()
            this.loader = false;
          }, error: (err) => {
            this.handleError("Server Error")
          }
        })

      }
    })

  }

  setData(response: any) {
    this.branchData = response?.branch?.rows;
    console.log("this.branchData", this.branchData)
  }

}
