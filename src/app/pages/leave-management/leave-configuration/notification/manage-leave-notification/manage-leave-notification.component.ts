import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import Swal from 'sweetalert2';
declare var UIkit: any;

@Component({
  selector: 'app-manage-leave-notification',
  templateUrl: './manage-leave-notification.component.html',
  styleUrls: ['./manage-leave-notification.component.scss']
})
export class ManageLeaveNotificationComponent implements OnInit {

  currentPage: number = 1;
  limit: number = 10
  offset: number = 0
  loader: boolean = false;
  userData: any;
  count: any;
  preferenceKeys = PreferenceKeys;
  appNotiData: any = []
  approvalNotiData: any = []
  pendingNotiData: any = []
  encashNotiData: any =[]
  editAppNoti = new Subject<any>();
  isEditAppNoti: boolean = false
  editApprovalNoti = new Subject<any>();
  isEditApprovalNoti: boolean = false
  editPendingNoti = new Subject<any>();
  isEditPendingNoti: boolean = false
  editEncashNoti = new Subject<any>();
  isEditEncashNoti: boolean = false

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
    this.getAppNoti()
    this.getApprovalNoti()
    this.getPendingNoti()
    this.getEncashNoti()
  }

  getAppNoti() {
    this.loader = true;
    var temp = {
      "owner_id": this.userData?.data?.owner_id,
      "limit": this.limit,
      "offset": this.offset,
      "isDeleted": false
    }
    this.masterService.getAppNoti(temp).subscribe({
      next: (res: any) => {
        this.setAppNotiData(res.leaveApplicationNotification.rows)
        this.count = res.leaveApplicationNotification.count
        this.loader = false;
        // console.log("shhhhhhh", res)
      },
      error: (err: any) => {
        this.handleError(err)
      }
    })
  }

  getApprovalNoti() {
    this.loader = true;
    var temp = {
      "owner_id": this.userData?.data?.owner_id,
      "limit": this.limit,
      "offset": this.offset,
      "isDeleted": false
    }
    this.masterService.getApprovalNoti(temp).subscribe({
      next: (res: any) => {
        this.setApprovalNotiData(res.leaveApprovalNotification.rows)
        this.count = res.leaveApprovalNotification.count
        this.loader = false;
        // console.log("shhhhhhh", res)
      },
      error: (err: any) => {
        this.handleError(err)
      }
    })
  }

  getPendingNoti() {
    this.loader = true;
    var temp = {
      "owner_id": this.userData?.data?.owner_id,
      "limit": this.limit,
      "offset": this.offset,
      "isDeleted": false
    }
    this.masterService.getPendingNoti(temp).subscribe({
      next: (res: any) => {
        this.setPendingNotiData(res.leavePendingNotification.rows)
        this.count = res.leavePendingNotification.count
        this.loader = false;
        // console.log("shhhhhhh", res)
      },
      error: (err: any) => {
        this.handleError(err)
      }
    })
  }

  getEncashNoti() {
    this.loader = true;
    var temp = {
      "owner_id": this.userData?.data?.owner_id,
      "limit": this.limit,
      "offset": this.offset,
      "isDeleted": false
    }
    this.masterService.getEncashNoti(temp).subscribe({
      next: (res: any) => {
        this.setEncashNotiData(res.leaveEncashAppovalNotification.rows)
        this.count = res.leaveEncashAppovalNotification.count
        this.loader = false;
        // console.log("shhhhhhh", res)
      },
      error: (err: any) => {
        this.handleError(err)
      }
    })
  }

  setAppNotiData(res: any) {
    this.appNotiData = res
  }

  setApprovalNotiData(res: any) {
    this.approvalNotiData = res
  }

  setPendingNotiData(res: any) {
    this.pendingNotiData = res
  }

  setEncashNotiData(res: any) {
    this.encashNotiData = res
  }

  openAppNoti(data: any) {
    console.log(data)
    this.isEditAppNoti = true
    this.editAppNoti.next(data)
    UIkit.modal("#add-app-noti").show();
  }

  openApprovalNoti(data: any) {
    console.log(data)
    this.isEditApprovalNoti = true
    this.editApprovalNoti.next(data)
    UIkit.modal("#add-approval-noti").show();
  }

  openPendingNoti(data: any) {
    console.log(data)
    this.isEditPendingNoti = true
    this.editPendingNoti.next(data)
    UIkit.modal("#add-pending-noti").show();
  }

  openEncashNoti(data: any) {
    console.log(data)
    this.isEditEncashNoti = true
    this.editEncashNoti.next(data)
    UIkit.modal("#add-encash-noti").show();
  }

  onPageChange(event: any) {
    this.currentPage = event
    this.offset = ((event - 1) * this.limit);
    this.getAppNoti()
  }

  deleteAppNoti(id: any) {
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
        this.masterService.deleteAppNoti(temp).subscribe({
          next: (res: any) => {
            Swal.fire(
              'Deleted!',
              'Your Leave Application Notification has been deleted.',
              'success'
            )
            this.getAppNoti()
          }, error: (e: any) => {
            this.handleError("Server Error")
          }
        })
      }
    })
  }

  deleteApprovalNoti(id: any) {
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
        this.masterService.deleteApprovalNoti(temp).subscribe({
          next: (res: any) => {
            Swal.fire(
              'Deleted!',
              'Your Leave Approval Notification has been deleted.',
              'success'
            )
            this.getApprovalNoti()
          }, error: (e: any) => {
            this.handleError("Server Error")
          }
        })
      }
    })
  }

  deletePendingNoti(id: any) {
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
        this.masterService.deletePendingNoti(temp).subscribe({
          next: (res: any) => {
            Swal.fire(
              'Deleted!',
              'Your Leave Pending Notification has been deleted.',
              'success'
            )
            this.getPendingNoti()
          }, error: (e: any) => {
            this.handleError("Server Error")
          }
        })
      }
    })
  }

  deleteEncashNoti(id: any) {
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
        this.masterService.deleteEncashNoti(temp).subscribe({
          next: (res: any) => {
            Swal.fire(
              'Deleted!',
              'Your Leave Encash Notification has been deleted.',
              'success'
            )
            this.getEncashNoti()
          }, error: (e: any) => {
            this.handleError("Server Error")
          }
        })
      }
    })
  }

}
