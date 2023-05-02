import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-upload-attendance',
  templateUrl: './manage-upload-attendance.component.html',
  styleUrls: ['./manage-upload-attendance.component.scss']
})
export class ManageUploadAttendanceComponent implements OnInit {

  limit: number = 10
  offset: number = 0
  count: any;
  currentPage: number = 1;
  loader: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onPageChange(event: any) {
    this.currentPage = event
    this.offset = ((event - 1) * this.limit);
  }

}
