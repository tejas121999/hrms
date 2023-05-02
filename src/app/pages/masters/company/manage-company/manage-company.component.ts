import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import Swal from 'sweetalert2';
declare var UIkit: any;
declare var $: any;

@Component({
  selector: 'app-manage-company',
  templateUrl: './manage-company.component.html',
  styleUrls: ['./manage-company.component.scss']
})
export class ManageCompanyComponent implements OnInit, OnDestroy {
  searchText = new FormControl('');
  editData = new Subject<any>();
  loader: boolean = false;
  from: number = 0;
  limit: number = 10
  offset: number = 0
  currentPage: number = 1;
  companyData: any = [];
  count: any;
  isEdit: boolean = false;
  preferenceKeys = PreferenceKeys;
  ownerId: any
  userData: any;

  constructor(
    private masterServices: MasterServices,
    private appPreference: AppPreference,
  ) { }

  ngOnInit(): void {
    this.setIsEdit()
    this.getProfile()
    this.getCompany()
    this.loader = true
    setTimeout(() => this.loader = false, 2000);
    this.searchText.valueChanges.subscribe((query: any) => {
      console.log("===query", query)
      this.searchCompeny(query)
    })
  }

  searchCompeny(data: any) {
    var temp = {
      "isDeleted": false,
      "limit": this.limit,
      "offset": this.offset,
      "company_owner_id": this.userData?.data?.owner_id,
      "q": data
    }
    this.masterServices.searchCompany(temp).subscribe({
      next: (response: any) => {
        this.loader = false;
        this.count = response.data.count
        this.companyData = response.data.rows
      },
      error: (err) => {
        this.handleError(err)
      }
    })
  }

  setIsEdit() {
    this.appPreference.setObject(this.preferenceKeys.ISEDIT, false)
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }
  ngOnDestroy(): void {
    $("#add-company").remove();
  }

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }
  }

  getCompany() {
    this.loader = true;
    var temp = {
      "where": false,
      "limit": this.limit,
      "offset": this.offset,
      "company_owner_id": this.userData?.data?.owner_id
    }
    this.masterServices.getCompany(temp).subscribe({
      next: (response: any) => {
        this.setData(response);
        this.loader = false;
        this.count = response.company.count
      },
      error: (err) => {
        this.handleError(err)
      }
    })
  }

  openEdit(data: any) {
    this.isEdit = true;
    this.appPreference.setObject(this.preferenceKeys.ISEDIT, true)
    this.editData.next(data)
    UIkit.modal("#add-company").show();
  }

  deleteCompany(data: any) {
    Swal.fire({
      title: 'Alert',
      text: "This action will affect all users on the system. Please confirm that you want to proceed.",
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
        this.masterServices.deleteCompany(temp).subscribe({
          next: (res: any) => {
            this.loader = false
            this.handleSuccess("Company Delete Successfully")
            this.getCompany()
          },
          error: (err: any) => {
            this.handleError(err)
          }
        })
      }
    })
  }

  setData(response: any) {
    this.companyData = response['company']['rows']
    console.log(this.companyData)
  }

  onPageChange(event: any) {
    console.log(event)
    console.log("1 this.offset", this.offset)
    this.currentPage = event
    this.offset = ((event - 1) * this.limit);
    console.log("2 this.offset", this.offset)
    this.getCompany();
  }

}
