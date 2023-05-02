import { Component, OnInit } from '@angular/core';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';

@Component({
  selector: 'app-manage-template',
  templateUrl: './manage-template.component.html',
  styleUrls: ['./manage-template.component.scss']
})
export class ManageTemplateComponent implements OnInit {

  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference,
  ) { }

  userData: any;
  limit: number = 10
  offset: number = 0
  template: any[] = []
  count: any

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
    this.getTemplate()
  }

  getTemplate() {
    var temp = {
      "isDeleted": false,
      "owner_id": this.userData?.data?.owner_id,
      "limit": this.limit,
      "offset": this.offset
    }
    this.masterService.getTemplate(temp).subscribe({
      next: (res: any) => {
        console.log(res.template.rows)
        this.template = res.template.rows
        this.count = res.template.count
      }, error: (e: any) => {
        this.handleError("server error")
      }
    })
  }
}
