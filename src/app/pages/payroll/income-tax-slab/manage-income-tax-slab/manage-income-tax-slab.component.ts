import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-income-tax-slab',
  templateUrl: './manage-income-tax-slab.component.html',
  styleUrls: ['./manage-income-tax-slab.component.scss']
})
export class ManageIncomeTaxSlabComponent implements OnInit {

  currentPage: any
  limit: number = 5
  offset: number = 0

  constructor() { }

  ngOnInit(): void {
  }

  year : any = [
    { year : "Apr 2022 - Mar 2023" },
    { year : "Mar 2023 - Feb 2024" },
    { year : "Feb 2024 - Jan 2025" },
    { year : "Jan 2025 - Dec 2026" },
    { year : "Dec 2026 - Nov 2027" },
    { year : "Nov 2027 - Oct 2028" },
  ];

  onPageChange(event: any) {
    this.currentPage = event
    this.offset = ((event - 1) * this.limit);
  }

}
