import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-upload-attendance',
  templateUrl: './add-upload-attendance.component.html',
  styleUrls: ['./add-upload-attendance.component.scss']
})
export class AddUploadAttendanceComponent implements OnInit {

  files: File[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(event: { addedFiles: any; }) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  reset(){}

}
