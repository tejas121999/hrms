import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import Swal from 'sweetalert2';
declare var UIkit: any;
@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {
  editData = new Subject<any>();
  isEdit: boolean = false;
  currentPage: any
  limit: number = 10
  offset: number = 0
  userData: any
  count: any;
  loader: boolean = false;
  from: number = 0;
  getData: any;
  loanData: any;

  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference


  ) { }

  ngOnInit(): void {

    this.getProfile();
    this.getLoadData();
    this.loader = true
  }

  onPageChange(event: any) {
    this.currentPage = event;
    this.from = event * 10 - 10;
  }
  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }


  }
  getLoadData() {
    let temp = {

      "isDeleted": false,
      "limit": this.limit,
      "offset": this.offset,
      "role_owner_id": this.userData?.data?.owner_id,

    }
    this.masterService.getLoadData(temp).subscribe({
      next: (res: any) => {
        console.log(res);

        this.getData = res.empLoan.rows;
        console.log(this.getData);

      }, error: (e: any) => {
        console.log(e);

      }

    });

  }
  openEdit(user: any) {
    this.isEdit = true;
    this.editData.next(user)
    UIkit.modal("#record-loan").show();
  }
  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }
  deleteLoanEmployee(user: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this Record ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loader = true
        let temp = {
          "loan_id": user.id,
          "isDeleted": true
        }
        this.masterService.deleteLoanEmployee(temp).subscribe({
          next: (res: any) => {

            this.loader = false
            Swal.fire(
              'Deleted!',
              'Your Loan data has been deleted.',
              'success'
            )
            this.getLoadData()
          },
          error: (err: any) => {
            this.handleError(err)
          }
        })
      }
    })

  }
}
