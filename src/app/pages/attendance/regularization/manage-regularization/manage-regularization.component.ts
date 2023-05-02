import { Component, OnInit } from '@angular/core';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';

@Component({
  selector: 'app-manage-regularization',
  templateUrl: './manage-regularization.component.html',
  styleUrls: ['./manage-regularization.component.scss']
})
export class ManageRegularizationComponent implements OnInit {

  limit: number = 10
  offset: number = 0
  from: number = 0;
  currentPage: number = 1;
  userData: any;
  count: any;
  departmentdata: any = [];
  managenameid: any;
  managename: any;
  loader: boolean = false;
  manageRegularization: any[] = []
  constructor(
    private masterServices: MasterServices,
    private appPreference: AppPreference,
  ) {
   }

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
      next: (res) => {
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
  getRegularizationData() {
    this.loader = true
    var temp = {
      "isDeleted": false,
      "owner_id": this.userData?.data?.owner_id,
      "limit": this.limit,
      "offset": this.offset,
      "manager_id":this.managenameid
    };
    console.log("getRegularizationData", temp, this.currentPage, this.offset);
    this.masterServices.getRegularization(temp).subscribe({
      next: (res: any) => {
        console.log(res)
        this.count = res.getRequest.count
        this.manageRegularization = res.getRequest.rows
        this.loader = false
      },
      error: (err: any) => {
        if (err.message) {
          this.handleError('Server Error')
        }
      }
    })
  }
  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  onPageChange(event: any) {
    this.currentPage = event
    this.offset = ((this.currentPage - 1) * this.limit);
    this.getRegularizationData()
  }

}
