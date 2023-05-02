import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import Swal from 'sweetalert2';
declare var UIkit: any;
declare var $: any;

@Component({
  selector: 'app-manage-rig-manifest',
  templateUrl: './manage-rig-manifest.component.html',
  styleUrls: ['./manage-rig-manifest.component.scss']
})
export class ManageRigManifestComponent implements OnDestroy, OnInit {

  limit: number = 10
  offset: number = 0
  loader: boolean = false;
  count: any;
  rigData: any = [];
  currentPage: number = 1;
  editData = new Subject<any>();
  isEdit: boolean = false;
  userData: any;
  preferenceKeys = PreferenceKeys;

  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference
  ) { }

  ngOnInit(): void {
    this.getProfile()
    this.getRig()
  }

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

  getRig() {
    this.loader = true;
    var temp = {
      "isDeleted": false,
      "limit": this.limit,
      "offset": this.offset,
      "rig_owner_id": this.userData?.data?.owner_id
    }

    this.masterService.getRig(temp).subscribe({
      next: (res: any) => {
        this.setData(res.rigManifest.rows)
        // console.log(res.rigManifest.count)
        this.count = res.rigManifest.count
        this.loader = false;
      },
      error: (err: any) => {
        this.handleError(err)
      }
    })
  }

  setData(res: any) {
    this.rigData = res
  }

  openEdit(user: any) {
    this.isEdit = true;
    this.editData.next(user)
    UIkit.modal("#add-rig-manifest").show();
  }

  ngOnDestroy(): void {
    $("#add-rig-manifest").remove();
  }

  onPageChange(event: any) {
    this.currentPage = event
    this.offset = ((event - 1) * this.limit);
    this.getRig();
  }

  deleteRig(data: any) {
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
          "id": data.id,
          "isDeleted": true
        }
        console.log("heelo", data.id)
        this.masterService.deleteRig(temp).subscribe({
          next: (res: any) => {
            this.loader = false
            // this.handleSuccess("Rig Delete Successfully")

            Swal.fire(
              'Deleted!',
              'Your Rig has been deleted.',
              'success'
            )
            this.getRig()
            console.log(res)
          },
          error: (err: any) => {
            this.handleError(err)
          }
        })
      }
    })
  }

}
