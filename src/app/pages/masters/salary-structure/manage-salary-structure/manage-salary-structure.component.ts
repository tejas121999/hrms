import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference } from 'src/app/shared/app-preference';
declare var UIkit: any;
@Component({
  selector: 'app-manage-salary-structure',
  templateUrl: './manage-salary-structure.component.html',
  styleUrls: ['./manage-salary-structure.component.scss']
})
export class ManageSalaryStructureComponent implements OnInit {
  loader: boolean = false;
  limit: number = 15
  offset: number = 0
  editData = new Subject<any>();
  isEdit: boolean = false;
  count: any
  currentPage: any
  salaryStructureData: any[] = []
  constructor(
    private masterService: MasterServices,
    private appPreference: AppPreference
  ) { }

  ngOnInit(): void {
    this.getSalaryStructure()
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  getSalaryStructure() {
    this.loader = true
    var temp = {
      "where": false,
      "limit": this.limit,
      "offset": this.offset
    }
    this.masterService.getSalaryStructure(temp).subscribe({
      next: (res: any) => {
        this.count = res.salaryStructure.count
        this.setData(res.salaryStructure.rows)
        this.loader = false
      },
      error: (err: any) => {
        this.handleError(err)
      }
    })
  }

  deletesalary(data: any) {
    this.loader = true
    var temp = {
      "id": data.id,
      "isDeleted": true
    }

    this.masterService.deleteSalaryStructure(temp).subscribe({
      next: (res: any) => {
        this.loader = false
        this.handleSuccess("Salary Structure Delete Successfully")
        this.getSalaryStructure()
      },
      error: (err: any) => {
        this.handleError(err)
      }
    })
  }

  setData(res: any) {
    console.log(res)
    this.salaryStructureData = res
  }

  openEdit(data: any) {
    this.isEdit = true;
    this.editData.next(data)
    UIkit.modal("#add-salary-structure").show();
  }

  onPageChange(event: any) {
    this.currentPage = event
    this.offset = ((event - 1) * this.limit);
    this.getSalaryStructure()
  }
}
