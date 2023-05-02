import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MasterServices } from 'src/app/services/master-services';
declare var UIkit: any;
declare var $: any;
@Component({
  selector: 'app-manage-yearly-roster',
  templateUrl: './manage-yearly-roster.component.html',
  styleUrls: ['./manage-yearly-roster.component.scss']
})
export class ManageYearlyRosterComponent implements OnDestroy, OnInit {

  yearlyData:any=[]
  viewData = new Subject<any>();
  isView: boolean = false;
  show = false;
  limit: any = 5
  offset: any = 0
  currentPage: number = 1;
count: string|number|undefined;
loader: boolean=false;

  constructor(
    private masterService: MasterServices,
  ) { }

  ngOnInit(): void {
    this.getYearly();
  }

  getYearly() {
    this.loader = true
    let temp =
    {
      "query":{},
      "limit":this.limit,
      "offset":this.offset
    }
    this.masterService.getYearlyRosters(temp).subscribe({
      next: (res: any) => {

        this.count=  res.roster.count
        this.show = true
        this.yearlyData = res.roster.rows
        this.loader = false
      }
    })
  }

  onPageChange(event: any) {
    this.currentPage = event
    this.offset = ((event - 1) * this.limit);
    this.getYearly();
  }
  viewDatas(data: any) {
    this.isView = true;
    this.viewData.next(data)
    UIkit.modal("#view-yearly-roster").show();
  }
  ngOnDestroy(): void {
    $("#view-yearly-roster").remove();
    $("#add-yearly-roster").remove();

  }
}
