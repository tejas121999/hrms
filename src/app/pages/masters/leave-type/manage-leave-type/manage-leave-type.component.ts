import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import Swal from 'sweetalert2';
declare var UIkit: any;
declare var $: any;
@Component({
  selector: 'app-manage-leave-type',
  templateUrl: './manage-leave-type.component.html',
  styleUrls: ['./manage-leave-type.component.scss']
})
export class ManageLeaveTypeComponent implements OnDestroy,OnInit {

  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference
  ) { }
  preferenceKeys = PreferenceKeys;
  currentPage: any
  limit: number = 10
  offset: number = 0
  leaveData: any[] = []
  count: any
  isEdit: boolean = false;
  loader: boolean = false;
  editData = new Subject<any>();
  userData: any;

  ngOnInit(): void {
    this.getProfile()
    this.getLevave()
  }

  openAdd() {
    UIkit.modal("#add-leave-type").show();
  }
  ngOnDestroy(): void {
    $("#add-leave-type").remove();
  }
  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
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
  }

  getLevave() {
    this.loader = true
    var temp = {
      "leave_owner_id": this.userData.data.owner_id,
      "where": false,
      "limit": this.limit,
      "offset": this.offset
    }
    this.masterService.getLeaves(temp).subscribe({
      next: (res: any) => {
        this.loader = false
        this.count = res.leave.count
        this.setData(res.leave.rows)
      }, error: (err: any) => {
        this.handleError(err)
      }
    });

  }

  deleteLeave(data: any) {
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
        this.loader = true
        var temp = {
          "id": data.id,
          "isDeleted": true
        }
        this.masterService.deleteLeave(temp).subscribe({
          next: (res: any) => {
            this.loader = false

            Swal.fire(
              'Deleted!',
              'Your Leave has been deleted.',
              'success'
            )
            // this.handleSuccess("Leave Delete Successfully")
            this.getLevave()
          },
          error: (err: any) => {
            this.handleError(err)
          }
        })
      }
    })
  }

  setData(res: any) {
    this.leaveData = res
  }

  openEdit(data: any) {
    this.editData.next(data)
    this.isEdit = true;
    UIkit.modal("#add-leave-type").show();
  }

  onPageChange(event: any) {
    this.currentPage = event
    this.offset = ((event - 1) * this.limit);
    this.getLevave()
  }
}
