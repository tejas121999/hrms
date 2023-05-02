import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference } from 'src/app/shared/app-preference';
declare var UIkit: any;

@Component({
  selector: 'app-manage-employee-grade',
  templateUrl: './manage-employee-grade.component.html',
  styleUrls: ['./manage-employee-grade.component.scss']
})
export class ManageEmployeeGradeComponent implements OnInit {

  limit: any = 100
  gradeData: any = []
  loader: boolean = false;
  from: number = 0;
  currentPage: number = 1;
  count: any;
  editData = new Subject<any>();
  isEdit: boolean = false;

  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference
  ) { }

  ngOnInit(): void {
    this.getGrade()
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  getGrade() {
    this.loader = true;
    var temp = {
      "where": false,
      "limit": this.limit,
      "offset": 0
    }

    this.masterService.getGrade(temp).subscribe({
      next: (res: any) => {
        console.log(res.grade.rows)
        this.setData(res.grade.rows)
        this.loader = false;
      },
      error: (err: any) => {
        this.handleError(err)
      }
    })
  }

  setData(res: any) {
    this.gradeData = res
  }

  onPageChange(event: any) {
    this.currentPage = event;
    this.from = event * 10 - 10;
    this.getGrade();
  }

  deleteGrade(data: any) {
    this.loader = true
    console.log(data.id)
    var temp = {
      "id": data.id,
      "isDeleted": true
    }
    this.masterService.deleteGrade(temp).subscribe({
      next: (res: any) => {
        this.loader = false
        this.handleSuccess("Grade Delete Successfully")
        this.getGrade();
      },
      error: (err: any) => {
        this.handleError(err)
      }
    })
  }

  openEdit(user: any) {
    this.isEdit = true;
    this.editData.next(user)
    UIkit.modal("#add-employee-grade").show();
  }
}
