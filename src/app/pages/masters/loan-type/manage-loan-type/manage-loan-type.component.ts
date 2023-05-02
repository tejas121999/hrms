import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import Swal from 'sweetalert2';
declare var UIkit: any;
declare var $: any;

@Component({
  selector: 'app-manage-loan-type',
  templateUrl: './manage-loan-type.component.html',
  styleUrls: ['./manage-loan-type.component.scss']
})
export class ManageLoanTypeComponent implements OnDestroy,OnInit {
  editData = new Subject<any>();
  isEdit: boolean = false;
  currentPage: any
  limit: number = 10
  offset: number = 0
  userData:any
  count: any;
  loader: boolean=false;
  loanList:any=[]

  ngOnInit(): void {
    this.getProfile();
    this.getloanList();
  }


  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference,
  ) { }


  permission: any;
  accessPermission: any;

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

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }


  onPageChange(event: any) {
    this.currentPage = event
    this.offset = ((event - 1) * this.limit);
    this.getloanList()
  }
  getloanList() {
    this.loader = true

      var temp = {

        "where": false,
        "limit": this.limit,
        "offset": this.offset,
        "loan_owner_id":  this.userData?.data?.owner_id,

      }
      this.masterService.getloan(temp).subscribe({
        next: (res: any) => {
          console.log(res);

           this.count = res.loan.count;
           this.loanList=res.loan.rows

          this.loader = false
        },
        error: (err: any) => {
          this.handleError(err.error)
        }
      })


  }
  deleteLoan(id: any) {
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
        var temp = {
          "loan_id": id,
          "isDeleted": true
        }
        this.masterService.deleteLoan(temp).subscribe({
          next: (res: any) => {
            this.loader = false
            Swal.fire(
              'Deleted!',
              'Your Loan data has been deleted.',
              'success'
            )
            this.getloanList()
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
    UIkit.modal("#add-loan-type").show();
  }
  ngOnDestroy(): void {
    $("#add-loan-type").remove();
  }
}
