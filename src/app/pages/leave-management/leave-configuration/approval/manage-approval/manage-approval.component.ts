import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import Swal from 'sweetalert2';
declare var UIkit: any;

@Component({
  selector: 'app-manage-approval',
  templateUrl: './manage-approval.component.html',
  styleUrls: ['./manage-approval.component.scss']
})
export class ManageApprovalComponent implements OnInit {

  currentPage: number = 1;
  limit: number = 10
  offset: number = 0
  loader: boolean = false;
  userData: any;
  count: any;
  preferenceKeys = PreferenceKeys;
  leaveData: any = []
  EncashAppData: any = []
  EncashApprovalData: any = []
  editLeaveApprovel = new Subject<any>();
  isEditLeaveApproval: boolean = false
  editEncashApplication = new Subject<any>();
  isEditEncashApp: boolean = false
  editEncashApproval = new Subject<any>();
  isEditEncashApproval: boolean = false

  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference
  ) { }

  ngOnInit(): void {
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
    this.getLeaveApproval()
    this.getEncashApplication()
    this.getEncashApproval()
  }

  getLeaveApproval() {
    this.loader = true;
    var temp = {
      "owner_id": this.userData?.data?.owner_id,
      "limit": this.limit,
      "offset": this.offset,
      "isDeleted": false
    }
    this.masterService.getLeaveApproval(temp).subscribe({
      next: (res: any) => {
        this.setLeaveData(res.leaveApproval.rows)
        this.count = res.leaveApproval.count
        this.loader = false;
        // console.log("shhhhhhh", res.leaveApproval.rows)
      },
      error: (err: any) => {
        this.handleError(err)
      }
    })
  }

  getEncashApplication() {
    this.loader = true;
    var temp = {
      "owner_id": this.userData?.data?.owner_id,
      "limit": this.limit,
      "offset": this.offset,
      "isDeleted": false
    }
    this.masterService.getEncashApplication(temp).subscribe({
      next: (res: any) => {
        this.setEncashAppData(res.leaveEncashApplication.rows)
        this.count = res.leaveEncashApplication.count
        this.loader = false;
      },
      error: (err: any) => {
        this.handleError(err)
      }
    })
  }

  getEncashApproval() {
    this.loader = true;
    var temp = {
      "owner_id": this.userData?.data?.owner_id,
      "limit": this.limit,
      "offset": this.offset,
      "isDeleted": false
    }
    this.masterService.getEncashApproval(temp).subscribe({
      next: (res: any) => {
        this.setEncashApprovalData(res.leaveEncashApproval.rows)
        this.count = res.leaveEncashApproval.count
        this.loader = false;
        // console.log("shhhhhhh", res)
      },
      error: (err: any) => {
        this.handleError(err)
      }
    })
  }

  setLeaveData(res: any) {
    this.leaveData = res
  }

  setEncashAppData(res: any) {
    this.EncashAppData = res
  }

  setEncashApprovalData(res: any) {
    this.EncashApprovalData = res
  }

  onPageChange(event: any) {
    this.currentPage = event
    this.offset = ((event - 1) * this.limit);
    this.getLeaveApproval()
  }

  openLeaveApproval(data: any) {
    console.log(data)
    this.isEditLeaveApproval = true
    this.editLeaveApprovel.next(data)
    UIkit.modal("#add-leave-approval").show();
  }

  openEncashApplication(data: any) {
    console.log(data)
    this.isEditEncashApp = true
    this.editEncashApplication.next(data)
    UIkit.modal("#add-encash-application").show();
  }

  openEncashApproval(data: any) {
    console.log(data)
    this.isEditEncashApproval = true
    this.editEncashApproval.next(data)
    UIkit.modal("#add-encash-approval").show();
  }

  deleteLeaveApproval(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you to want delete this Record ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result: any) => {
      if (result.isConfirmed) {
        var temp = {
          "id": id,
          "isDeleted": true
        }
        this.masterService.deleteLeaveApproval(temp).subscribe({
          next: (res: any) => {
            Swal.fire(
              'Deleted!',
              'Your Leave Approval has been deleted.',
              'success'
            )
            this.getLeaveApproval()
          }, error: (e: any) => {
            this.handleError("Server Error")
          }
        })
      }
    })
  }

  deleteEncashApplication(id: any) {
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
        var temp = {
          "id": id,
          "isDeleted": true
        }
        this.masterService.deleteEncashApplication(temp).subscribe({
          next: (res: any) => {
            Swal.fire(
              'Deleted!',
              'Your Leave Encash Application has been deleted.',
              'success'
            )
            this.getEncashApplication()
          }, error: (e: any) => {
            this.handleError("Server Error")
          }
        })
      }
    })
  }

  deleteEncashApproval(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you to want delete this Record ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result: any) => {
      if (result.isConfirmed) {
        var temp = {
          "id": id,
          "isDeleted": true
        }
        this.masterService.deleteEncashApproval(temp).subscribe({
          next: (res: any) => {
            Swal.fire(
              'Deleted!',
              'Your Leave Encash Approval has been deleted.',
              'success'
            )
            this.getEncashApproval()
          }, error: (e: any) => {
            this.handleError("Server Error")
          }
        })
      }
    })
  }

}
