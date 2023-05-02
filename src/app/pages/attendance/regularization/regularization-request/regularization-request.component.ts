import { Component, OnInit } from '@angular/core';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-regularization-request',
  templateUrl: './regularization-request.component.html',
  styleUrls: ['./regularization-request.component.scss']
})
export class RegularizationRequestComponent implements OnInit {
  userData: any;
  count: any;
  limit: number = 10
  offset: number = 0
  departmentdata: any = [];
  currentPage: number = 1;
  managenameid: any;
  loader=false
  managename: any;
  manageRegularization: any[] = []
  constructor(
    private masterServices: MasterServices,
    private appPreference: AppPreference,
  ) { }

  ngOnInit(): void {
    this.getProfile();

    setTimeout(() => {
      this.getRegularizationData()
    }, 1000);
  }
  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }
    this.getDepartmentid();

  }

  getDepartmentid() {
    let temp = {
      id: this.userData.data.department_id,
    };
    this.masterServices.getDepartmentid(temp).subscribe({
      next: (res: any) => {
        console.log('api Calling',res);

        this.departmentdata = res;
        this.departmentdata.department.forEach((element: any) => {
          this.managename = element.manager_data.first_name;
          this.managenameid = element.manager_id;

        });
      },
      error: (e: any) => {
        this.handleError(e);
      },
    });
  }
  approve(){
    let temp={
      "req_id": 27,
      "request": {
          "isApproved": 2
      },
      "data":{
      "employee_id":293,
      "status":"present",
      "attendence_date":"2023-03-28",
      "inTime":"2023-03-09 04:30:38",
      "outTime":"2023-03-08 13:30:49"
      }

  }

  }

  decline(){

  }
  getRegularizationData() {
    var temp = {
      "isDeleted": false,
      "owner_id": this.userData?.data?.owner_id,
      "limit": this.limit,
      "offset": this.offset,
      "manager_id":this.managenameid
    };
    this.masterServices.getRegularization(temp).subscribe({
      next: (res: any) => {
        console.log(res)
        this.count = res.getRequest.count
        this.manageRegularization = res.getRequest.rows
      },
      error: (err: any) => {
        if (err.message) {
          this.handleError('Server Error')
        }
      }
    })
  }

  regularizationRequest() {
    var temp = {

    }
  }

  approved(id: any) {
    Swal.fire({
      title: 'Are you sure',
      text: ' Do you want to approve this regularization Request?',
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
        this.masterServices.declineReqest(temp).subscribe({
          next: (res: any) => {
          },
          error: (e: any) => {
            this.handleError('error');
          },
        });
        this.masterServices.deleteHolidaylist(temp).subscribe({
          next: (res: any) => {
            Swal.fire('Approved', ' Holiday as been approve.', 'success');
            this.regularizationRequest();
          },
          error: (e: any) => {},
        });
      }
    });
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  onPageChange(event: any) {
    this.currentPage = event
    this.offset = ((this.currentPage - 1) * this.limit);
    this.getRegularizationData()
  }

  employee_name = [
    { name: "Monika" },
    { name: "Kavita" },
    { name: "Pratiksha" },
    { name: "Saloni" },
    { name: "Priya" },
    { name: "Prajakta" },
    { name: "Shilpa" },
    { name: "Rohit" },
    { name: "Akhilesh" },
    { name: "Pawan" },
    { name: "Tejas" },
  ]

}
