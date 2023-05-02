import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
declare var UIkit: any;
import Swal from 'sweetalert2';
@Component({
  selector: 'app-manage-candidate-exit-detail',
  templateUrl: './manage-candidate-exit-detail.component.html',
  styleUrls: ['./manage-candidate-exit-detail.component.scss']
})
export class ManageCandidateExitDetailComponent implements OnInit {
  userData: any;
  limit: number = 10
  offset: number = 0
  currentPage: number = 1;
  count: any;
  editData = new Subject<any>();
  exitCandidate: any[] = []
  isEdit: boolean = false;
  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference,
  ) { }

  ngOnInit(): void {
    this.getProfile()
  }

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }
    this.getExitCandidate()
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }
  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  getExitCandidate() {
    var temp = {
      "isDeleted": false,
      "owner_id": this.userData?.data?.owner_id,
      "limit": this.limit,
      "offset": this.offset
    }
    this.masterService.getExitDetails(temp).subscribe({
      next: (res: any) => {
        this.exitCandidate = res.exitDetails.rows
        this.count = res.exitDetails.count
      }, error: (e: any) => {
        this.handleError("Server Error")
      }
    })
  }

  onPageChange(event: any) {
    this.currentPage = event
    this.offset = ((event - 1) * this.limit);
    this.getExitCandidate();
  }

  openEdit(data: any) {
    this.isEdit = true;
    console.log
    this.editData.next(data)
    UIkit.modal("#add-exit-detail").show();
  }

  approveExit(data: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to Confirm exit of this Record ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result: any) => {
      if (result.isConfirmed) {
        var temp = {
          "id": data.id
        }
        this.masterService.deleteExitdetails(temp).subscribe({
          next: (res: any) => {
            this.getExitCandidate()
            Swal.fire(
              'Exited!',
              'Your Employee has been exited.',
              'success'
            )

          }, error: (err: any) => {
            this.handleError("Server Error")
          }
        })
      }
    })
  }
}
