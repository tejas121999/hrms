import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Editor, Toolbar } from 'ngx-editor';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { ManageTemplateComponent } from '../manage-template/manage-template.component';
declare var UIkit: any;

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.scss']
})
export class AddTemplateComponent implements OnInit {

  addTemplateForm = new FormGroup({
    formName: new FormControl("addTemplateForm"),
    template_name: new FormControl(""),
    template_type: new FormControl(""),
    template_description: new FormControl(''),
    form_name: new FormControl(''),
    fields: new FormControl(''),
    template: new FormControl(''),
  })
  userData: any;
  editor: any;
  isEdit: any;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  templateType = [
    { id: 1, type: 'Email template' },
    { id: 2, type: 'Document template' },
  ]

  form_name = [
    { name: 'department' },
    { name: 'designation' },
    { name: 'employee' },
    { name: 'package' },
  ]

  fields: any

  constructor(
    private formValidator: FormValidator,
    private masterService: MasterServices,
    private appPreference: AppPreference,
    private manageTemplate: ManageTemplateComponent
  ) { }

  ngOnInit(): void {
    this.editor = new Editor();
    this.getProfile()
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }
  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO),
    }

    console.log("this.userData?.data?.owner_id", this.userData?.data?.owner_id)
  }
  addTemplate() {
    var temp: any = {
      "template": {
        ...this.addTemplateForm.value
      }
    }

    temp.template.owner_id = this.userData?.data?.owner_id
    console.log("============", temp)
    this.masterService.addTemplate(temp).subscribe({
      next: (res: any) => {
        this.handleSuccess("Add Template Successfully")
        this.reset()
      }, error: (e: any) => {
        this.handleError("Server Error")
      }
    })
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  reset() {
    this.addTemplateForm.reset()
    UIkit.modal("#add-template").hide();
    this.manageTemplate.getTemplate()
  }
  fields_name: any[] = []
  getTemplateField(event: any) {
    console.log("event", event.name)
    var temp = {
      "formName": event.name
    }
    this.masterService.getFields(temp).subscribe({
      next: (res: any) => {
        console.log(res?.getfield[0]?.department)
        this.fields_name = res?.getfield[0]?.department
      }, error: (e: any) => {
        this.handleError("Server Error")
      }
    })
  }

  data: any = []
  getfield(event: any) {
    this.fields = event.field_name
  }

  templateDescription() {
    console.log(this.addTemplateForm.value.fields)
    console.log("this.fields", this.fields)
    // var data: any = []
    var data2 = this.fields
    this.data.push(data2)
    data2 = ''
    // data.push(this.fields)
    console.log("====", this.data)
    var value: any = this.data.toString();
    // this.getfield(this.fields)
    console.log("string", value)
    this.addTemplateForm.get('template')?.patchValue(value)
  }


}
