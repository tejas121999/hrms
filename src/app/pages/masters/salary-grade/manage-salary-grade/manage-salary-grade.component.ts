import { Component, OnInit } from '@angular/core';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference } from 'src/app/shared/app-preference';

@Component({
  selector: 'app-manage-salary-grade',
  templateUrl: './manage-salary-grade.component.html',
  styleUrls: ['./manage-salary-grade.component.scss']
})
export class ManageSalaryGradeComponent implements OnInit {

  limit: any = 100
  salaryGradeData: any[] = []
  loader: boolean = false;
  from: number = 0;
  currentPage: number = 1;
  count: any;

  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference
  ) { }

  ngOnInit(): void {
    this.getSalaryGrade()
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  getSalaryGrade(){
    this.loader = true;
    var temp = {
      "limit": this.limit,
      "offset": 0
    }
    this.masterService.getSalaryGrade(temp).subscribe({
      next: (res: any) => {
        this.setData(res);
        this.loader = false;
        console.log(res)
      },
      error: (err) => {
        this.handleError(err)
      }
    })
  }

  setData(res: any){
    this.salaryGradeData = res['salaryGrade']['rows'];
    console.log(this.salaryGradeData)
  }

  onPageChange(event: any) {
    this.currentPage = event;
    this.from = event * 10 - 10;
    this.getSalaryGrade();
  }

}
