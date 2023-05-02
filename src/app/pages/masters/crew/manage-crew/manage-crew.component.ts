import { Component, OnInit } from '@angular/core';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';

@Component({
  selector: 'app-manage-crew',
  templateUrl: './manage-crew.component.html',
  styleUrls: ['./manage-crew.component.scss']
})
export class ManageCrewComponent implements OnInit {
  userData: any;
  getCrewData: any[] = []
  limit: number = 10
  offset: number = 0
  currentPage: number = 1;
  count: any;
  isEdit: boolean = false;
  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference
  ) { }

  ngOnInit(): void {
    this.getProfile()
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
    this.getCrew()
  }

  getCrew() {
    var temp = {
      "owner_id": this.userData?.data?.owner_id,
      "limit": this.limit,
      "offset": this.offset,
    }
    this.masterService.getCrew(temp).subscribe({
      next: (res: any) => {
        this.getCrewData = res?.crew?.rows
        this.count = res?.crew?.count
      }, error: (e: any) => {
        this.handleError("Server Error")
      }
    })
  }

  onPageChange(event: any) {
    console.log(event)
    console.log("1 this.offset", this.offset)
    this.currentPage = event
    this.offset = ((event - 1) * this.limit);
    console.log("2 this.offset", this.offset)
    this.getCrew();
  }
}
