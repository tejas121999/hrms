import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import Swal from 'sweetalert2';
declare var UIkit: any;

@Component({
  selector: 'app-manage-salary-comp',
  templateUrl: './manage-salary-comp.component.html',
  styleUrls: ['./manage-salary-comp.component.scss']
})
export class ManageSalaryCompComponent implements OnInit {
  searchText = new FormControl('');
  limit: any = 5
  offset: any = 0
  limit2: any = 5
  offset2: any = 0
  limit3: any = 5
  offset3: any = 0
  salaryCompData: any[] = []
  loader: boolean = false;
  from: number = 0;
  currentPage: number = 1;
  count: any;
  editData = new Subject<any>();
  isEdit: boolean = false;
  userData: any;
  preferenceKeys = PreferenceKeys;
  permission: any;
  accessPermission: any;

  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference
  ) { }

  ngOnInit(): void {
    this.getProfile()
    this.getSalaryComp()
    this.searchText.valueChanges.subscribe((query: any) => {
      console.log("===query", query)
      this.searchSalaryComp(query)
    })
  }

  searchSalaryComp(data: any) {
    this.loader = true;
    var temp: any
    if (this.component_type === 1) {
      temp = {
        "isDeleted": false,
        "limit": this.limit,
        "offset": this.offset,
        "component_owner_id": this.userData?.data?.owner_id,
        "component_type": [
          "Earnings"
        ],
        "q": data
      }
    } else if (this.component_type === 2) {
      temp = {
        "isDeleted": false,
        "limit": this.limit2,
        "offset": this.offset2,
        "component_owner_id": this.userData?.data?.owner_id,
        "component_type": [
          "Deduction"
        ],
        "q": data
      }
    } else if (this.component_type === 3) {
      temp = {
        "isDeleted": false,
        "limit": this.limit3,
        "offset": this.offset3,
        "component_owner_id": this.userData?.data?.owner_id,
        "component_type": [
          "Reimbursements"
        ],
        "q": data
      }
    }

    this.masterService.searchSalaryComponent(temp).subscribe({
      next: (res: any) => {
        this.count = res.data.count
        // this.setData(res);
        this.salaryCompData = res.data.rows
        this.loader = false;
      },
      error: (err) => {
        this.loader = false;
        this.handleError(err)
      }
    })
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
    this.accessPermission = {
      accessdata: this.appPreference.getObject(PreferenceKeys.ACCESS)
    }
    this.permission = this.accessPermission?.accessdata
    console.warn(this.permission.add_denied_request);
  }

  component_type: number = 1
  preparepayloade(event: any) {
    console.log(event)
    this.component_type = event
    this.getSalaryComp()
  }



  getSalaryComp() {
    this.loader = true;
    var temp: any
    if (this.component_type === 1) {
      temp = {
        "isDeleted": false,
        "limit": this.limit,
        "offset": this.offset,
        "component_owner_id": this.userData?.data?.owner_id,
        "component_type": [
          "Earnings"
        ]
      }
    } else if (this.component_type === 2) {
      temp = {
        "isDeleted": false,
        "limit": this.limit2,
        "offset": this.offset2,
        "component_owner_id": this.userData?.data?.owner_id,
        "component_type": [
          "Deduction"
        ]
      }
    } else if (this.component_type === 3) {
      temp = {
        "isDeleted": false,
        "limit": this.limit3,
        "offset": this.offset3,
        "component_owner_id": this.userData?.data?.owner_id,
        "component_type": [
          "Reimbursements"
        ]
      }
    }
    this.masterService.getSalaryComp(temp).subscribe({
      next: (res: any) => {
        this.count = res.salaryComponent.count
        this.setData(res);
        this.loader = false;
        console.log(res)
      },
      error: (err) => {
        this.handleError(err)
      }
    })
  }

  setData(res: any) {
    this.salaryCompData = res['salaryComponent']['rows'];
    console.log(this.salaryCompData)
  }

  onPageChange(event: any) {
    this.currentPage = event
    this.offset = ((event - 1) * this.limit);
    this.getSalaryComp();
  }

  onPageChange2(event: any) {
    this.currentPage = event
    this.offset2 = ((event - 1) * this.limit2);
    this.getSalaryComp();
  }

  onPageChange3(event: any) {
    this.currentPage = event
    this.offset3 = ((event - 1) * this.limit3);
    this.getSalaryComp();
  }

  deleteManage(data: any) {
    console.log("hello")
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
        this.masterService.deleteSalaryComponent(temp).subscribe({
          next: (res: any) => {
            this.loader = false

            Swal.fire(
              'Deleted!',
              'Your Salary Component has been deleted.',
              'success'
            )

            this.getSalaryComp()
          },
          error: (err: any) => {
            this.handleError(err)
          }
        })

      }
    })

  }

  openEdit(data: any) {
    this.isEdit = true;
    this.editData.next(data)
    UIkit.modal("#add-salary-comp").show();
  }

}
