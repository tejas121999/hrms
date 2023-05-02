import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
declare var $: any;
@Component({
  selector: 'app-manage-roster',
  templateUrl: './manage-roster.component.html',
  styleUrls: ['./manage-roster.component.scss']
})
export class ManageRosterComponent implements OnInit,OnDestroy {

  editData = new Subject<any>();
  userData: any
  UIkit: any;
  count: any;
  loader: boolean = false;
  rosterData: any = [];
  limit: any = 10
  offset: any = 0
  currentPage: number = 1;
  passengerData: any = []
  isButtonActive = false;
  constructor(
    private masterServices: MasterServices,
    private appPreference: AppPreference,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getProfile();
    this.getRoster();
    this.getPassenger()
  }

  permission: any;
  accessPermission: any;

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }
  }

  getPassenger() {
    var temp = {
      "owner_id": this.userData?.data?.owner_id,
      "isDeleted": false,
      "limit": this.limit,
      "offset": this.offset
    }
    this.masterServices.getPassenger(temp).subscribe({
      next: (res: any) => {
        this.passengerData = res.passengerManifest.rows
        console.log(res)
      },
      error: (err: any) => {
        this.handleError(err)
      }
    })
  }

  getRoster() {
    this.loader = true
    let temp = {
      // "roster_id":1
      // "query":{},
      // "limit":this.limit,
      // "offset":this.offset
    }
    this.masterServices.getRoster(temp).subscribe({
      next: (res: any) => {
        console.log('log', res);

        // this.count=  res.roster.count
        this.rosterData = res.roster;
        this.loader = false

      }, error: (err: any) => {
        this.handleError(err.error)
      }
    });

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
    this.getRoster();
  }
  passenger_id: any
  roster_id: any
  crew_id: any
  getPassengerId(event: any , index: any) {
    // console.log("=====", event.id)
    this.passenger_id = event.id
    this.isButtonActive = true;
  }

  getRosterID(e: any) {
    console.log("getroster", e)
    this.roster_id = e.id
    this.crew_id = e.on_crew_id

    console.log("this.roster_id", this.roster_id)
    console.log("this.crew_id", this.crew_id)

    this.router.navigate(["/masters/crew-passenger-data"], { queryParams: { passenger_id: this.passenger_id, roster_id: this.roster_id, crew_id: this.crew_id } });
  }
  ngOnDestroy(): void {
    $("#add-roster").remove();
  }
}
