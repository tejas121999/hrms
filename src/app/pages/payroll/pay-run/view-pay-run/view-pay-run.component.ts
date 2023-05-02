import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-pay-run',
  templateUrl: './view-pay-run.component.html',
  styleUrls: ['./view-pay-run.component.scss']
})
export class ViewPayRunComponent implements OnInit {

  limit: number = 10
  offset: number = 0
  currentPage: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  onPageChange(event: any) {
    this.currentPage = event
    this.offset = ((event - 1) * this.limit);
  }

}
