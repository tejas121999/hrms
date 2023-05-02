import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
declare var UIkit: any;
@Component({
  selector: 'app-manage-present-employee',
  templateUrl: './manage-present-employee.component.html',
  styleUrls: ['./manage-present-employee.component.scss']
})
export class ManagePresentEmployeeComponent implements OnInit {

  currentPage: number = 1
  limit: number = 10
  offset: number = 0
  preferenceKeys = PreferenceKeys;
  userData: any;
  count: any;
  alwaysPresentEmp: any[] = []
  editData = new Subject<any>();
  isEdit: boolean = false;

  constructor(
    private masterServices: MasterServices,
    private appPreference: AppPreference,
  ) { }

  ngOnInit(): void {
    this.getProfile()
  }

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }
    this.getAlwaysPresentEmp()
  }


  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  getAlwaysPresentEmp() {
    var temp = {
      "owner_id": this.userData?.data?.owner_id,
      "isDeleted": false,
      "limit": this.limit,
      "offset": this.offset
    }

    this.masterServices.getAlwaysPresent(temp).subscribe({
      next: (res: any) => {
        this.count = res.data.count
        this.alwaysPresentEmp = res.data.rows
      },
      error: (err: any) => {
        this.handleError('Server Error')
      }
    })
  }

  openEdit(data: any) {
    this.isEdit = true;
    this.editData.next(data)
    UIkit.modal("#add-present-emp").show();
  }

  deletePresentEmp(id: any) {
    var temp = {
      "id": id,
      "isDeleted": true
    }

    this.masterServices.deleteAlwayspresentEmp(temp).subscribe({
      next: (res: any) => {
        this.handleSuccess("Record Deleted Successfully")
        this.getAlwaysPresentEmp()
      }, error: (e: any) => {
        this.handleError("Server Error")
      }
    })
  }


  onPageChange(event: any) {
    this.currentPage = event > 0 ? event : 1
    this.offset = ((this.currentPage - 1) * this.limit);
    this.getAlwaysPresentEmp()
  }

}
