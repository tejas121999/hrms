import { Component, OnInit } from '@angular/core';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-leave-request',
  templateUrl: './manage-leave-request.component.html',
  styleUrls: ['./manage-leave-request.component.scss'],
})
export class ManageLeaveRequestComponent implements OnInit {
  loader: boolean = true;
  search: any;
  count: any;
  userData: any;
  leaveData: any;
  from: number = 0;
  limit: number = 9;
  offset: number = 0;
  selectedAttributes = 11;
  currentPage: number = 1;
  isActive = 11;
  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference
  ) { }

  option = [
    { id: 11, name: 'All' },
    { id: 0, name: 'Pending' },
    { id: 1, name: 'Decline' },
    { id: 2, name: 'Approved' },
  ];
  ngOnInit(): void {
    this.getProfile();
    // this.allleave_request()
    this.leave_request();
  }
  permission: any;
  accessPermission: any;

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO),
    };
    this.accessPermission = {
      accessdata: this.appPreference.getObject(PreferenceKeys.ACCESS),
    };
    this.permission = this.accessPermission?.accessdata;
    console.warn(this.permission.add_denied_request);
  }
  leave_request() {
    this.loader = true;
    var temp = {
      isDeleted: false,
      owner_id: this.userData?.data?.owner_id,
      manager_id: this.userData?.data?.user_emp_ID,
      limit: this.limit,
      offset: this.offset,
      isApproved: [0, 1, 2],
    };

    this.masterService.leave_request(temp).subscribe({
      next: (res: any) => {
        this.loader = false;
        this.count = res?.getRequest?.count;
        this.leaveData = res?.getRequest?.rows;
        console.log(this.leaveData[0]?.total_leave_days);
      },
      error: (err: any) => {
        this.handleError(err.error);
      },
    });
  }

  // allleave_request() {
  //   this.loader = true;
  //   var temp = {
  //     "limit": this.limit,
  //     "offset": this.offset,
  //     "isDeleted": false,
  //     "owner_id": this.userData?.data?.owner_id,
  //     "emp_id": this.userData?.data?.user_emp_ID,
  //   }

  //   this.masterService.getAllReq(temp).subscribe({
  //     next: (res: any) => {
  //       this.loader = false
  //       this.count = res.getRequest.count
  //       this.leaveData = res.getRequest.rows;
  //       console.log(this.leaveData[0].total_leave_days);
  //     }, error: (err: any) => {
  //       this.handleError(err.error);

  //     }
  //   });

  // }

  handleError(msg: any) {
    this.appPreference.showWarning(msg);
  }
  onPageChange(event: any) {
    this.currentPage = event;
    this.offset = (event - 1) * this.limit;
    this.leave_request();
  }
  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg);
  }

  declineReqest(id: any) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Leave has been declined',
      showConfirmButton: false,
      timer: 1500,
    });

    var temp = {
      req_id: id,
      request: {
        isApproved: 1,
      },
    };
    this.masterService.approvedReqest(temp).subscribe({
      next: (res: any) => {
        this.leave_request();
      },
      error: (e: any) => {
        this.handleError('error');
      },
    });
  }

  selected_item: any
  selectId = 11;
  changeFilter(e: any) {
      this.loader = true;
    this.isActive = e;
    console.log("===========", e);
    this.selected_item = e
    if (e == 11) {
      var temp = {
        isDeleted: false,
        owner_id: this.userData?.data?.owner_id,
        manager_id: this.userData?.data?.user_emp_ID,
        limit: this.limit,
        offset: this.offset,
        isApproved: [0, 1, 2],
      };

      this.masterService.leave_request(temp).subscribe({
        next: (res: any) => {
          this.loader = false;
          this.count = res.getRequest.count;
          this.leaveData = res.getRequest.rows;
          // console.log(this.leaveData[0].total_leave_days);
        },
        error: (err: any) => {
          this.handleError(err.error);
        },
      });
    } else if (e == 0) {
      var temp = {
        isDeleted: false,
        owner_id: this.userData?.data?.owner_id,
        manager_id: this.userData?.data?.user_emp_ID,
        limit: this.limit,
        offset: this.offset,
        isApproved: [0],
      };

      this.masterService.leave_request(temp).subscribe({
        next: (res: any) => {
          this.loader = false;
          this.count = res.getRequest.count;
          this.leaveData = res.getRequest.rows;
          // console.log(this.leaveData[0].total_leave_days);
        },
        error: (err: any) => {
          this.handleError(err.error);
        },
      });
    } else if (e == 1) {
      var temp = {
        isDeleted: false,
        owner_id: this.userData?.data?.owner_id,
        manager_id: this.userData?.data?.user_emp_ID,
        limit: this.limit,
        offset: this.offset,
        isApproved: [1],
      };

      this.masterService.leave_request(temp).subscribe({
        next: (res: any) => {
          this.loader = false;
          this.count = res.getRequest.count;
          this.leaveData = res.getRequest.rows;
          console.log(this.leaveData[0].total_leave_days);
        },
        error: (err: any) => {
          this.handleError(err.error);
        },
      });
    } else if (e == 2) {
      var temp = {
        isDeleted: false,
        owner_id: this.userData?.data?.owner_id,
        manager_id: this.userData?.data?.user_emp_ID,
        limit: this.limit,
        offset: this.offset,
        isApproved: [2],
      };

      this.masterService.leave_request(temp).subscribe({
        next: (res: any) => {
          this.loader = false;
          this.count = res.getRequest.count;
          this.leaveData = res.getRequest.rows;
          console.log(this.leaveData[0].total_leave_days);
        },
        error: (err: any) => {
          this.handleError(err.error);
        },
      });
    }
  }

  approved(id: any) {
    Swal.fire({
      title: 'Are you sure',
      text: ' Do you want to approve this leave?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Approve',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loader = true;

        var temp = {
          req_id: id,
          request: {
            isApproved: 2,
          },
        };
        this.masterService.declineReqest(temp).subscribe({
          next: (res: any) => {
            this.leave_request();
          },
          error: (e: any) => {
            this.handleError('error');
          },
        });
        this.masterService.deleteHolidaylist(temp).subscribe({
          next: (res: any) => {
            Swal.fire('Approved', ' Holiday as been approve.', 'success');
            this.leave_request();
          },
          error: (e: any) => { },
        });
      }
    });
  }
}
