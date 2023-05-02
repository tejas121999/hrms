import { getLocaleMonthNames } from '@angular/common';
import { Component, Input, OnInit, ɵisPromise } from '@angular/core';
import * as moment from 'moment';
import { ExportService } from 'src/app/services/export.service';
import { MasterServices } from 'src/app/services/master-services';
import { ManageYearlyRosterComponent } from '../manage-yearly-roster/manage-yearly-roster.component';

@Component({
  selector: 'app-view-yearly-roster',
  templateUrl: './view-yearly-roster.component.html',
  styleUrls: ['./view-yearly-roster.component.scss']
})
export class ViewYearlyRosterComponent implements OnInit {
  @Input('isView') isView: boolean = false;
  yearlyId: any;
  onCrew: any;
  offCrew: any;
  countDays: any
  appPreference: any;
  repCrewData: any = []
  comboCrewData: any = []
  mainCrewData = [];
  oncrewdatefinel: any = []
  offcrewdatefinel: any = [];
  finelonoffcrewdata: any = []
  allfinelonoffcrewdata: any [  ]= []
  oncrewname: any
  offcrewname: any
  datetoggle = false
  constructor(
    private masterService: MasterServices,
    private manageYearly: ManageYearlyRosterComponent,
    public exportService: ExportService) { }

  ngOnInit(): void {

    this.viewDatas()
  }

  reset() {
    location.reload();
    this.manageYearly.getYearly()


  }
  datadisplay: any = []
  minimumDate: any;
  dateCount: any
  dateSent: any
  startdat: any;
  days: any;
  startDatayearly: any
  crewDates: any = [];
  findate: any = []
  firstoffdate: any;
  lastondate = false;
  datestart: any;
  dateend: any
  viewDatas() {
    this.finelonoffcrewdata = [];
    this.oncrewdatefinel = [];
    this.allfinelonoffcrewdata=[]
    this.offcrewdatefinel = []
    this.crewDates = [];
    this.findate = []
    this.datadisplay = []
    this.manageYearly.viewData.subscribe({
      next: (data) => {
        this.datadisplay = data


        this.firstoffdate = moment(data.startDate)
        this.firstoffdate = this.firstoffdate._d
        var datsss = new Date(this.firstoffdate)
        this.yearlyId = data.id;
        this.onCrew = data.on_crew_id;
        this.offCrew = data.off_crew_id;
        this.oncrewname = data.on_crew.crew_name;
        this.offcrewname = data.off_crew.crew_name
        this.getonCrewDatas();
        this.getRepCrewData();
        this.dateSent = moment(data.endDate);
        this.minimumDate = moment(data.startDate);



        this.dateSent = this.dateSent._d;
        this.minimumDate = this.minimumDate._d

        this.days = Math.floor((Date.UTC(this.dateSent.getFullYear(), this.dateSent.getMonth(), this.dateSent.getDate()) - Date.UTC(this.minimumDate.getFullYear(), this.minimumDate.getMonth(), this.minimumDate.getDate())) / (1000 * 60 * 60 * 24));

        let days_loop = this.days / data.gap

        this.startDatayearly = moment(data.startDate)


        var last = new Date(this.startDatayearly);
        for (let index = 0; index < days_loop + 1; index++) {
          if (index == 0) {
            this.startDatayearly = `${last.getFullYear()}-${last.getMonth() + 1}- ${last.getDate()}`

          } else {
            last.setDate(last.getDate() + data.gap);
            this.startDatayearly = `${last.getFullYear()}-${last.getMonth() + 1}-${last.getDate()}`
          }
          this.crewDates.push(this.startDatayearly)



        }
        // console.log(this.crewDates);
        let cou = 0

        this.crewDates.forEach((element: any) => {
          element = moment(element)
          element = element._d
          if (cou % 2) {

            cou = 0
          } else {
            cou = 1
          }
          this.findate.push({ 'val': cou, 'crewdate': element })


        });

        this.datestart = moment(this.datadisplay.startDate)
        this.dateend = moment(this.datadisplay.endDate)

        this.datestart = this.datestart._d;
        this.dateend = this.dateend._d

        this.findate.forEach((ins: any) => {
          if (ins.crewdate.toLocaleDateString() !== this.dateend.toLocaleDateString()) {

            this.oncrewdatefinel.push(ins)

          }
          if (ins.crewdate.toLocaleDateString() !== this.datestart.toLocaleDateString()) {
            this.offcrewdatefinel.push(ins)

          }
          else {

          }




        });

    


        this.allfinelonoffcrewdata = this.getRoster()
   

      }, error: (e: any) => {
        this.handleError(e)
        this.reset()
      }
    })


  }

  getRoster(): any {

    let mainCrewId = 1;
    let replaceCrewId = 2;
    let currentCrewId = NaN;
    let singleRoster: any = []

    this.oncrewdatefinel.forEach((onn: any) => {
      var obj: any = {};
      var temp = new Date(onn.crewdate)
      obj.startDate = onn.crewdate
      var endDate = temp.setDate(obj.startDate.getDate() + this.datadisplay.gap);

      obj.endDate = new Date(endDate);
      if (Number.isNaN(currentCrewId)) currentCrewId = mainCrewId
      else if (currentCrewId == mainCrewId) currentCrewId = replaceCrewId
      else if (currentCrewId == replaceCrewId) currentCrewId = mainCrewId

      obj.crewId = currentCrewId

      singleRoster.push(obj)
    });
    return singleRoster;
  }

  getonCrewDatas() {


    let maintemp =
    {
      "crew_id": this.onCrew
    }
    this.masterService.getonCrewData(maintemp).subscribe({
      next: (res: any) => {


        let data
        data = res.crewEmployees;

        this.mainCrewData = data
      }
    })


  }
  async export() {

    if (this.mainCrewData != null) {
      setTimeout(async () => {
        await this.exportService.exportAsExcelFile(this.allfinelonoffcrewdata, `${this.oncrewname}-${this.offcrewname}`)

      }, 200);

    }
  }
  getRepCrewData() {

    let reptemp =
    {
      "crew_id": this.offCrew
    }
    this.masterService.getoffCrewData(reptemp).subscribe({
      next: (res: any) => {

        this.repCrewData = res.crewEmployees


        this.comboCrewData = []
        setTimeout(() => {
          this.mainCrewData.forEach((main: any) => {
            this.repCrewData.forEach((rep: any) => {
              this.comboCrewData.push({ "mainDes": main.job_title, "mainEmp": main.emp_name, "repDes": rep.job_title, "repEmp": rep.emp_name })

            });

          });


        }, 100);



      }
    })




  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

}
