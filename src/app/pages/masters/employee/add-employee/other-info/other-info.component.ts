import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-other-info',
  templateUrl: './other-info.component.html',
  styleUrls: ['./other-info.component.scss']
})
export class OtherInfoComponent implements OnInit {

  selectedDoc: any;
PAN: any;

  constructor() { }

  ngOnInit(): void {
    this.view()
  }

  doc = [
    {id: 1, name: 'PAN Card'},
    {id: 2, name: 'Aadhar Card'},
    {id: 3, name: 'Passport'},
    {id: 4, name: 'CDC'}
];

view(){
  console.log(this.selectedDoc)
}
}
