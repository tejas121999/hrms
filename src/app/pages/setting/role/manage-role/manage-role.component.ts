import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
declare var UIkit: any;
declare var $: any;

@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.scss']
})
export class ManageRoleComponent implements OnInit, OnDestroy {
  limit: number = 15
  offset: number = 0
  getRoleData: any[] = []
  preferenceKeys = PreferenceKeys;
  searchText = new FormControl('');
  userData: any;
  editData = new Subject<any>();
  isEdit: boolean = false;
  count: any
  currentPage: any
  loader: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private masterServices: MasterServices,
    private appPreference: AppPreference,
  ) { }

  ngOnInit(): void {
    this.getProfile()
    this.getRole()
    this.searchText.valueChanges.subscribe((query: any) => {
      console.log("===query", query)
      this.searchRole(query)
    })
  }

  searchRole(data: any) {
    var temp = {
      "isDeleted": false,
      "limit": this.limit,
      "offset": this.offset,
      "role_owner_id": this.userData?.data?.owner_id,
      "q": data,
    }
    this.masterServices.searchRole(temp).subscribe({
      next: (res: any) => {
        this.getRoleData = res.data.rows
      }, error: (err: any) => {
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
  }
  ngOnDestroy(): void {
    $("#add-role").remove();
  }
  getRole() {
    this.loader = true
    var temp = {
      "isDeleted": false,
      "limit": this.limit,
      "offset": this.offset,
      "role_owner_id": this.userData?.data?.owner_id
    }
    this.masterServices.getRole(temp).subscribe({
      next: (res: any) => {
        this.count = res.role.count
        this.getRoleData = res.role.rows
        if (res.role.rows.length === 0) {
          var temp = {
            "isDeleted": false,
            "limit": this.limit,
            "offset": this.offset,
            "role_owner_id": this.userData?.data?.owner_id
          }
          this.masterServices.getRole(temp).subscribe({
            next: (res: any) => {
              this.getRoleData = res.role.rows
            }, error: (err: any) => {
              this.handleError(err)
            }
          })
        }
        this.loader = false
      }, error: (err: any) => {
        this.handleError(err)
      }
    })
  }

  openEdit(user: any) {
    this.isEdit = true;
    this.editData.next(user)
    UIkit.modal("#add-role").show();
  }

  deleteRole(data: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this Record ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    })
      .then((result: any) => {
        if (result.isConfirmed) {
          this.loader = true
          var temp = {
            "role_id": data.id,
            "isDeleted": true
          }
          this.masterServices.deleteRole(temp).subscribe({
            next: (res: any) => {
              this.loader = false
              Swal.fire(
                'Deleted!',
                'Your Role has been deleted.',
                'success'
              )
              this.getRole()
              window.location.reload()
            },
            error: (err: any) => {
              this.handleError(err)
            }
          })
        }
      })
  }

  onPageChange(event: any) {
    this.currentPage = event
    this.offset = ((event - 1) * this.limit);
  }

  getAccessById(id: any) {
    this.router.navigate(["/setting/form-permission"], { queryParams: { value: id } });
  }
}
