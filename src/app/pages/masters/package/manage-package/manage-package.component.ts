import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
declare var UIkit: any;
declare var $: any;
@Component({
  selector: 'app-manage-package',
  templateUrl: './manage-package.component.html',
  styleUrls: ['./manage-package.component.scss']
})
export class ManagePackageComponent implements OnDestroy, OnInit {
  preferenceKeys = PreferenceKeys;
  loader: boolean = false;
  currentPage: number = 1;
  limit: number = 10
  offset: number = 0
  managePackage: any[] = []
  count: any
  isEdit: boolean = false;
  addItem: boolean = false;
  editData = new Subject<any>();
  userData: any;
  searchText = new FormControl('');
  permission: any;
  accessPermission: any;


  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference,
  ) { }

  ngOnInit(): void {
    this.getProfile()
    this.getPackage()

    this.searchText.valueChanges.subscribe((query: any) => {
      console.log("===query", query)
      this.searchPackage(query)
    })
  }

  searchPackage(data: any) {
    this.loader = true
    var temp = {
      "isDeleted": false,
      "package_owner_id": this.userData?.data?.owner_id,
      "q": data,
      "limit": 50,
      "offset": 0
    }
    this.masterService.searchPackage(temp).subscribe({
      next: (res: any) => {
        this.loader = false
        this.managePackage = res.data.rows
        this.count = res.data.count
      }, error: (err: any) => {
        if (err.message) {
          this.loader = false
          this.handleError('Server Error')
        }
      }
    })
  }

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }
    this.accessPermission = {
      accessdata: this.appPreference.getObject(PreferenceKeys.ACCESS)
    }
    this.permission = this.accessPermission?.accessdata
  }
  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  getPackage() {
    this.loader = true
    var temp = {
      "limit": this.limit,
      "offset": this.offset,
      "isDeleted": false,
      "package_owner_id": this.userData.data.owner_id
    }
    this.masterService.getPackage(temp).subscribe({
      next: (res: any) => {
        this.count = res.package.count
        this.setData(res.package.rows)
        this.loader = false

      }, error: (err: any) => {
        this.handleError("error to get data")
      }
    })
  }

  setData(data: any) {
    this.managePackage = data
  }

  openEdit(data: any) {
    this.isEdit = true;
    this.editData.next(data)
    UIkit.modal("#add-package").show();
  }
  ngOnDestroy(): void {
    $("#add-package").remove();
  }
  deletePackage(data: any) {
    var temp = {
      "id": data.id,
      "isDeleted": true
    }
    this.masterService.deletePackage(temp).subscribe({
      next: (res: any) => {
        this.handleSuccess("Deleted successfully")
        this.getPackage()
      }, error: (err: any) => {
        this.handleError("error to get data")
      }
    })
  }

  openAddPackage() {
    this.addItem = true
    UIkit.modal("#add-package").show();
  }


  onPageChange(event: any) {
    this.currentPage = event
    this.offset = ((event - 1) * this.limit);
    this.getPackage()
  }
}
