import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MasterServices } from 'src/app/services/master-services';
import { ManageRosterComponent } from '../../roster/manage-roster/manage-roster.component';

@Component({
  selector: 'app-crew-passenger-data',
  templateUrl: './crew-passenger-data.component.html',
  styleUrls: ['./crew-passenger-data.component.scss']
})
export class CrewPassengerDataComponent implements OnInit {

  userData: any;
  limit: any = 5
  offset: any = 0
  count: any;
  currentPage: number = 1;
  passengerData: any = []
  passenger_data: any = []
  roster_data: any = []
  crewEmployees: any = []
  crewName: any = []
  _id: any

  constructor(
    private masterService: MasterServices,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getPassengerData()
    // this.getRoster()
    this.getCrewData()
  }

  crewPassengerForm = new FormGroup({
    formName: new FormControl("crewPassengerForm"),
    type: new FormControl(''),
    purchasing: new FormControl(''),
    plant: new FormControl(''),
    date: new FormControl(''),
    vendor_code: new FormControl(''),
    subvendor_code: new FormControl(''),
    company_name: new FormControl(''),
    company_address: new FormControl(''),
    rfm_number: new FormControl(''),
    vendor_name: new FormControl(''),
    date_of_sorti: new FormControl(''),
    sorti_type: new FormControl(''),
    task: new FormControl(''),
    plant_for_manifest: new FormControl(''),
    mode_of_journey: new FormControl(''),
    scheduled_sector: new FormControl(''),
    schedule_dep_time: new FormControl(''),
    remark: new FormControl('')
  })

  crewForm = new FormGroup({
    formName: new FormControl("crewForm"),
    no_of_passenger: new FormControl(''),
    date: new FormControl(''),
    time: new FormControl(''),
    passenger_weight: new FormControl(''),
    luggage_weight: new FormControl(''),
    total_weight: new FormControl(''),
    cargo_ongc: new FormControl(''),
    cat: new FormControl(''),
    others: new FormControl(''),
    cargo_total: new FormControl(''),
    total_payload: new FormControl(''),
    status: new FormControl('')
  })

  getPassengerData() {
    this.route.queryParams.subscribe((data: any) => {
      console.log("data=====",data)
      // // const passenger_data = this.passengerData.find((data: any) => data.id === data.passenger_id)
      // // console.log("passenger_data", passenger_data)
      // this.passengerData.forEach((data: any, index: any)=>{
      //   console.log(data.id === data.passenger_id)
      //   if(data.id === data.passenger_id){
      //     this.passenger_data = this.passengerData[index]
      //   }
      // })
      var temp = {
        "id": data.passenger_id
      }
      console.log("temp", temp)
      this.masterService.getPassengerById(temp).subscribe({
        next: (res: any) => {
          this._id = res.passengerManifest.id
          this.crewPassengerForm.get("type")?.patchValue(res.passengerManifest.type)
          this.crewPassengerForm.get("purchasing")?.patchValue(res.passengerManifest.purchasing)
          this.crewPassengerForm.get("plant")?.patchValue(res.passengerManifest.plant)
          // this.crewPassengerForm.get("date")?.patchValue(res)
          this.crewPassengerForm.get("vendor_code")?.patchValue(res.passengerManifest.vendor_code)
          this.crewPassengerForm.get("subvendor_code")?.patchValue(res.passengerManifest.sub_vendor_code)
          this.crewPassengerForm.get("company_name")?.patchValue(res.passengerManifest.company_name)
          this.crewPassengerForm.get("company_address")?.patchValue(res.passengerManifest.company_address)
          this.crewPassengerForm.get("rfm_number")?.patchValue(res.passengerManifest.RFM_number)
          this.crewPassengerForm.get("vendor_name")?.patchValue(res.passengerManifest.vendor_name)
          this.crewPassengerForm.get("date_of_sorti")?.patchValue(res.passengerManifest.date_of_sortie)
          this.crewPassengerForm.get("sorti_type")?.patchValue(res.passengerManifest.sortie_type)
          this.crewPassengerForm.get("task")?.patchValue(res.passengerManifest.task)
          this.crewPassengerForm.get("plant_for_manifest")?.patchValue(res.passengerManifest.plant_of_manifest)
          this.crewPassengerForm.get("mode_of_journey")?.patchValue(res.passengerManifest.mode_of_journey)
          this.crewPassengerForm.get("scheduled_sector")?.patchValue(res.passengerManifest.scheduled_sector)
          this.crewPassengerForm.get("schedule_dep_time")?.patchValue(res.passengerManifest.scheduled_dep_time)
          this.crewPassengerForm.get("remark")?.patchValue(res.passengerManifest.remark)
          this.crewPassengerForm.get('date')?.patchValue(res.passengerManifest.passengerManifest_date)
          // this.crewPassengerForm.patchValue(res.data)
          this.passenger_data = res.passengerManifest
          console.log("Passenger data", this.passenger_data)
          console.log(res.id)
        }, error: (err: any) => {

        }
      })
    })
    console.log("this.passenger_data", this.passenger_data)
  }

  getCrewData() {
    this.route.queryParams.subscribe((data: any) => {
      let maintemp =
      {
        "crew_id": data.crew_id
      }
      console.log("crew id", data.roster_id)
      this.masterService.getonCrewData(maintemp).subscribe({
        next: (res: any) => {
          this.crewEmployees = res.crewEmployees
          console.log("crew employee", res.crewEmployees)
          this.crewName = res.crew
          console.log("crew name", res.crew)
        }
      })
    })
  }

}
