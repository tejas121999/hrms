import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
declare var UIkit: any;
import Swal from 'sweetalert2';


@Component({
  selector: 'app-manage-candidate',
  templateUrl: './manage-candidate.component.html',
  styleUrls: ['./manage-candidate.component.scss']
})
export class ManageCandidateComponent implements OnInit {
  preferenceKeys: any;
  searchText = new FormControl('');
  constructor(
    private formValidator: FormValidator,
    private masterService: MasterServices,
    private appPreference: AppPreference,
  ) { }
  loader: boolean = true;
  count: any
  userData: any;
  limit: number = 10
  offset: number = 0
  currentPage: number = 1;
  candaditData: any[] = []
  isEdit: boolean = false;
  editData = new Subject<any>();
  ngOnInit(): void {
    this.getProfile()
    this.getCandidate()
    this.searchText.valueChanges.subscribe((query: any) => {
      console.log("===query", query)
      this.searchCandidate(query)
    })
  }

  searchCandidate(data: any) {
    this.loader = true
    var temp = {
      "isDeleted": false,
      "limit": this.limit,
      "offset": this.offset,
      "candidate_owner_id": this.userData.data.owner_id,
      "isCandidates": false,
      "q": data
    }
    this.masterService.searchCandidate(temp).subscribe({
      next: (res: any) => {
        this.candaditData = res.data.rows
        this.count = res.data.count
        // this.loader = false
      }, error: (e: any) => {
        this.handleError(e)
        this.loader = false
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
    console.log(this.userData.data.owner_id)
  }

  onPageChange(event: any) {
    this.currentPage = event
    this.offset = ((event - 1) * this.limit);
  }

  getCandidate() {
    this.loader = true
    var temp = {
      "isDeleted": false,
      "limit": this.limit,
      "offset": this.offset,
      "candidate_owner_id": this.userData.data.owner_id,
      "isCandidates": false
    }
    this.masterService.getCandadit(temp).subscribe({
      next: (res: any) => {
        this.candaditData = res.candidate.rows
        this.count = res.candidate.count
        this.loader = false
      }, error: (e: any) => {
        this.handleError(e)
        this.loader = false
      }
    })
  }

  openEdit(data: any) {
    this.isEdit = true
    this.editData.next(data)
    UIkit.modal("#add-candidate").show();
  }

  deleteCandidate(data: any) {
    console.log(data)
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
        var temp = {
          "candiate_id": data.id
        }
        this.masterService.deleteCandiate(temp).subscribe({
          next: (res: any) => {
            this.getCandidate()
            Swal.fire(
              'Deleted!',
              'Your Employee has been deleted.',
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
