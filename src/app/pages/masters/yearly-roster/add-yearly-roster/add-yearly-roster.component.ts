import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { ManageYearlyRosterComponent } from '../manage-yearly-roster/manage-yearly-roster.component';
declare var UIkit: any;

@Component({
  selector: 'app-add-yearly-roster',
  templateUrl: './add-yearly-roster.component.html',
  styleUrls: ['./add-yearly-roster.component.scss']
})
export class AddYearlyRosterComponent implements OnInit {

  tabletoggle = true
  matchdes=false
  crewData: any = [];
  oncrewfetchData: any = [];
  mainCrewData: any = [];
  repCrewData: any = []
  comboCrewData:any =[]
  show = false;
  fromdate: any;
  repcrewname:any
  todate: any;
  id: any;
  ocir_id: any;
  @Input('isEdit') isEdit: boolean = false;
  buttonLoader: boolean = false;
  buttonDisable = false


  constructor(
    private masterService: MasterServices,
    private formValidator: FormValidator,
    private appPreference: AppPreference,
    private yearlyRosterComponent: ManageYearlyRosterComponent

  ) { }

  ngOnInit(): void {
    this.getCrewData();

  }


  yearlyCrewForm = new FormGroup({
    formName: new FormControl("yearlyCrewForm"),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    on_crew_id: new FormControl('', [Validators.required]),
    off_crew_id: new FormControl('', [Validators.required]),
    gap: new FormControl('', [Validators.required]),

  })



  getCrewData() {
    let temp = {

    }
    this.masterService.getCrewData(temp).subscribe({
      next: (res: any) => {
        this.crewData = res.crew.rows;
      }
    })
  }

  oncrewId: number = 0
  offcrewfetchData: any = [];
  getonCrewDatas(e: any) {
    console.log("======",e)
    this.tabletoggle=true
    this.matchdes=false
    this.repcrewname=''
    this.oncrewId = e.id

    let maintemp =
    {
      "crew_id": this.oncrewId
    }
    this.masterService.getonCrewData(maintemp).subscribe({
      next: (res: any) => {
        this.mainCrewData = res.crewEmployees
      }
    })
    var data: any = []
    this.crewData.forEach((element: any) => {
      if (element.id != this.oncrewId) {
        data.push(element)

      } else {
      }
    });
    if (data != null) {
      setTimeout(() => {
        this.offcrewfetchData = data;
      }, 200);
    }

  }

  getRepCrewData(e: any) {

    let reptemp =
    {
      "crew_id": e.id
    }
    this.masterService.getoffCrewData(reptemp).subscribe({
      next: (res: any) => {
          this.repCrewData = res.crewEmployees
          this.tabletoggle = false
          this.comboCrewData=[]
          this.mainCrewData.forEach((main: any) => {
            this.repCrewData.forEach((rep: any) => {

              
              if(main.designation_id == rep.designation_id || null) {

              }else{
                this.matchdes=true

                return
              }
              this.comboCrewData.push({"mainDes":main.job_title,"mainEmp":main.emp_name,"repDes":rep.job_title,"repEmp":rep.emp_name})
              
            });
            
          });
          console.log(this.comboCrewData);
          

      }
    })




  }




  fyears = [
    { name: "2022-2023" },
    { name: "2023-2024" },
    { name: "2024-2025" },
    { name: "2025-2026" },
    { name: "2026-2027" },
    { name: "2027-2028" },
    { name: "2028-2029" },
    { name: "2029-2030" },
    { name: "2030-2031" },
    { name: "2031-2032" },
    { name: "2032-2033" },
  ]

  dateday = [
    { day: 1 },
    { day: 2 },
    { day: 3 },
    { day: 4 },
    { day: 5 },
    { day: 6 },
    { day: 7 },
    { day: 8 },
    { day: 9 },
    { day: 10 },
    { day: 11 },
    { day: 12 },
    { day: 13 },
    { day: 14 },
    { day: 15 },
    { day: 16 },
    { day: 17 },
    { day: 18 },
    { day: 19 },
    { day: 20 },
    { day: 21 },
    { day: 22 },
    { day: 23 },
    { day: 24 },
    { day: 25 },
    { day: 26 },
    { day: 27 },
    { day: 28 },
    { day: 29 },
    { day: 30 },
    { day: 31 },

  ]
  handleError(msg: string) {
    this.appPreference.showWarning(msg)
  }
  handleSuccess(msg: string) {
    this.appPreference.showSuccess(msg)
  }

  oncrewdate(e: any) {

    // console.log(e.name.substring(0, 4));

  }
  setEdit() {

  }
  days: any;
  minimumDate: any
  toggle = true;
  cycleData: number = 0
  fromDates(e: any) {
    this.todate = ''
    this.minimumDate = new Date(e);
    this.toggle = false;

  }

  toDate(dateSent: any) {


    console.log('minimumDate' , this.minimumDate);
    

    this.days = Math.floor((Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) - Date.UTC(this.minimumDate.getFullYear(), this.minimumDate.getMonth(), this.minimumDate.getDate())) / (1000 * 60 * 60 * 24));

  }
  gapdate(noDays: any) {
    this.todate = ''

    this.cycleData = noDays.day

  }
  public myFilter = (d: Date | null): boolean => {
    var startDate = moment(this.minimumDate);
    var endDate = moment(d);
    var diff = endDate.diff(startDate, 'days')
    if (diff % this.cycleData != 0) {
      return false
    } else {
      return true

    }

  }

  getError(formGroup: FormGroup, controlName: any) {
    return this.formValidator.getErrorForControl(formGroup, controlName);
  }


  addYearlyRoster() {


    var startDate: any = moment(this.yearlyCrewForm.get('startDate')?.value).format("YYYY-MM-DD");
    var endDate: any = moment(this.yearlyCrewForm.get('endDate')?.value).format("YYYY-MM-DD");

    if (this.yearlyCrewForm.invalid) {
      this.yearlyCrewForm.markAllAsTouched()
    
    } 
    if(this.matchdes == true){
      return 
   }
    else {
      let temp = {
        "roster": {
          "startDate": startDate,
          "endDate": endDate,
          "on_crew_id": this.yearlyCrewForm.get('on_crew_id')?.value,
          "off_crew_id": this.yearlyCrewForm.get('off_crew_id')?.value,
          "gap": this.yearlyCrewForm.get('gap')?.value,
        }
      }

      this.masterService.addYearlyRoster(temp).subscribe({
        next: (res: any) => {

          this.handleSuccess("Yearly roster added successfully");
          this.reset();

        }, error: (err: any) => {

          this.handleError(err.message)
        }
      })

    }


  }

  reset() {

    this.yearlyCrewForm.reset()
    UIkit.modal("#add-yearly-roster").hide();
    this.yearlyRosterComponent.getYearly()
    this.tabletoggle = true

  }

}
