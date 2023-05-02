import { Component, OnInit } from '@angular/core';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
declare var UIkit: any;
@Component({
  selector: 'app-manage-attendance-notification',
  templateUrl: './manage-attendance-notification.component.html',
  styleUrls: ['./manage-attendance-notification.component.scss']
})
export class ManageAttendanceNotificationComponent implements OnInit {

  currentPage: number = 1;
  limit1: number = 5
  offset1: number = 0
  limit2: number = 5
  offset2: number = 0
  limit3: number = 5
  offset3: number = 0
  loader: boolean = false;
  userData: any;
  approveData: any = []
  absentData: any = []
  count: any;
  preferenceKeys = PreferenceKeys;
  editApprovel = new Subject<any>();
  editAbsent = new Subject<any>();
  editMissing = new Subject<any>();
  isEditApproval: boolean = false
  isEditAbsent: boolean = false
  isEditMissing: boolean = false

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

    this.getApproveAttendance()
    this.getAbsentAttendance()
    this.getMissingAttendence()
  }

  onPageChange_1(event: any) {
    this.currentPage = event
    this.offset1 = ((event - 1) * this.limit1);
    this.getApproveAttendance()
  }

  onPageChange_2(event: any) {
    this.currentPage = event
    this.offset2 = ((event - 1) * this.limit2);
    this.getAbsentAttendance()
  }

  onPageChange_3(event: any) {
    this.currentPage = event
    this.offset3 = ((event - 1) * this.limit3);
    this.getMissingAttendence()
  }


  getApproveAttendance() {
    this.loader = true;
    var temp = {
      "owner_id": this.userData?.data?.owner_id,
      "limit": this.limit1,
      "offset": this.offset1,
      "isDeleted": false
    }
    this.masterService.getApproveAttendance(temp).subscribe({
      next: (res: any) => {
        this.setApproveData(res.attendance.rows)
        this.count = res.attendance.count
        this.loader = false;
      },
      error: (err: any) => {
        this.handleError(err)
      }
    })
  }

  getAbsentAttendance() {
    this.loader = true;
    var temp = {
      "owner_id": this.userData?.data?.owner_id,
      "limit": this.limit2,
      "offset": this.offset2,
      "isDeleted": false
    }
    this.masterService.getAbsentAttendance(temp).subscribe({
      next: (res: any) => {
        this.setAbsentData(res.attendance.rows)
        this.count = res.attendance.count
        this.loader = false;
      },
      error: (err: any) => {
        this.handleError(err)
      }
    })
  }

  missingNotification: any[] = []
  getMissingAttendence() {
    var temp = {
      "owner_id": this.userData?.data?.owner_id,
      "limit": this.limit3,
      "offset": this.offset3,
      "isDeleted": false
    }
    this.masterService.getMissingAttendence(temp).subscribe({
      next: (res: any) => {
        console.log(res)
        this.missingNotification = res?.attendance?.rows
        this.count = res.attendance.count
        this.loader = false;
      },
      error: (err: any) => {
        this.handleError(err)
      }
    })
  }

  deleteApproval(id: any) {
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
        this.loader = true;
        var temp = {
          "id": id,
          "isDeleted": true
        }
        this.masterService.deleteApproveAttendence(temp).subscribe({
          next: (res: any) => {
            Swal.fire(
              'Deleted!',
              'Your Attendance Approval has been deleted.',
              'success'
            )
            this.getApproveAttendance()
          }, error: (e: any) => {
            this.handleError("Server Error")
          }
        })

      }
    })
  }

  deleteAbsent(id: any) {
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
        this.loader = true;
        var temp = {
          "id": id,
          "isDeleted": true
        }
        this.masterService.deleteAbsentAttendence(temp).subscribe({
          next: (res: any) => {
            Swal.fire(
              'Deleted!',
              'Your Absent Notification has been deleted.',
              'success'
            )
            this.getAbsentAttendance()
          }, error: (e: any) => {
            this.handleError("Server Error")

          }
        })

      }
    })
  }

  deleteMissingAttendence(id: any) {
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
        this.loader = true;
        var temp = {
          "id": id,
          "isDeleted": true
        }
        this.masterService.deleteMissingAttendence(temp).subscribe({
          next: (res: any) => {
            Swal.fire(
              'Deleted!',
              'Your Missing Attendance Notification has been deleted.',
              'success'
            )
            this.getMissingAttendence()
          }, error: (e: any) => {
            this.handleError("Server Error")
          }
        })
      }
    })
  }

  setApproveData(res: any) {
    this.approveData = res
    console.log("this.approveData", this.approveData)
  }
  setAbsentData(res: any) {
    this.absentData = res
  }



  openApproval(data: any) {
    console.log(data)
    this.isEditApproval = true
    this.editApprovel.next(data)
    UIkit.modal("#add-approval-notification").show();
  }

  openAbsent(data: any) {
    this.isEditAbsent = true
    this.editAbsent.next(data)
    UIkit.modal("#add-absent-notification").show();
  }

  openMissingNotifi(data: any) {
    this.isEditMissing = true
    this.editMissing.next(data)
    UIkit.modal("#add-missing-notification").show();
  }

}
