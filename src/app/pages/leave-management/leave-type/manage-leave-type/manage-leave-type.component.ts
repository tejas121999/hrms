import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import Swal from 'sweetalert2';
declare var UIkit: any;

@Component({
  selector: 'app-manage-leave-type',
  templateUrl: './manage-leave-type.component.html',
  styleUrls: ['./manage-leave-type.component.scss']
})
export class ManageLeaveTypeComponent implements OnInit {
  searchText = new FormControl('');
  currentPage: number = 1;
  limit: number = 10
  offset: number = 0
  loader: boolean = false;
  count: any;
  userData: any;
  leaveData: any = []
  preferenceKeys = PreferenceKeys;
  editData = new Subject<any>();
  isEdit: boolean = false;

  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference
  ) { }

  ngOnInit(): void {
    this.getProfile()
    this.getLeaveType()
    this.searchText.valueChanges.subscribe((query: any) => {
      console.log("===query", query)
      this.searchLeave(query)
    })
  }

  searchLeave(data: any) {
    this.loader = true
    var temp = {
      "owner_id": this.userData?.data?.owner_id,
      "company_id": this.userData?.data?.company_id,
      "limit": this.limit,
      "offset": this.offset,
      "isDeleted": false,
      "q": data,
    }
    this.masterService.searchLeaveType(temp).subscribe({
      next: (res: any) => {
        this.leaveData = res.data.rows
        this.count = res.data.count
        this.loader = false;
      },
      error: (err: any) => {
        this.handleError(err)
        this.loader = false;
      }
    })
  }
  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }
  }

  getLeaveType() {
    this.loader = true
    var temp = {
      "isDeleted": false,
      "owner_id": this.userData?.data?.owner_id,
      "company_id": this.userData?.data?.company_id,
      "limit": this.limit,
      "offset": this.offset,
    }
    this.masterService.getLeaveType(temp).subscribe({
      next: (res: any) => {
        this.setData(res.leaveType.rows)
        this.count = res.leaveType.count
        this.loader = false;
      },
      error: (err: any) => {
        this.handleError(err)
      }
    })
  }

  setData(res: any) {
    this.leaveData = res
    console.log("this.leaveData", this.leaveData)
  }

  openEdit(user: any) {
    // console.log("siuwqhduwqdgweygdwy" ,user);
    this.isEdit = true;
    this.editData.next(user)
    UIkit.modal("#add-leave").show();
  }

  deleteLeaveType(data: any) {
    console.log("this.currentPage", this.currentPage)
    console.log("this.offset", this.offset);
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
        // console.log("hkllllllllllllllll" ,temp)
        this.masterService.deleteLeaveType(temp).subscribe({
          next: (res: any) => {
            this.loader = false
            Swal.fire(
              'Deleted!',
              'Your Leave Type has been deleted.',
              'success'
            )
            this.getLeaveType()
            window.location.reload()
          },
          error: (err: any) => {
            this.handleError(err)
          }
        })
      }
    })
  }

  onPageChange(event: any) {
    console.log("============", event)
    // this.currentPage = event > 0 ? event : 1
    // this.offset = ((this.currentPage - 1) * this.limit);
    // console.log("2", this.offset);
    this.currentPage = event
    this.offset = ((event - 1) * this.limit);
    this.getLeaveType()
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

}
