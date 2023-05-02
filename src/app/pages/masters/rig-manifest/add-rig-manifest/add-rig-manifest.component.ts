import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
declare var UIkit: any;
import * as moment from "moment";
import { ManageRigManifestComponent } from '../manage-rig-manifest/manage-rig-manifest.component';
// import { FILE_UPLOAD_LIMIT, FOLDERS, supportedFileTypes } from 'src/app/shared/config/config';
// import { firstValueFrom } from 'rxjs';
import { DmsService } from 'src/app/services/dms.service';

@Component({
  selector: 'app-add-rig-manifest',
  templateUrl: './add-rig-manifest.component.html',
  styleUrls: ['./add-rig-manifest.component.scss']
})
export class AddRigManifestComponent implements OnInit {

  files: File[] = [];
  limit = 5
  loader: boolean = false;
  buttonLoader: boolean = false;
  offset: number = 0;
  buttondisable = false
  rigFormData: any = []
  @Input('isEdit') isEdit: boolean = false;
  id: any
  preferenceKeys = PreferenceKeys;
  userData: any;
  rigFile: any;
  rigForm!:FormGroup
  ngOnChanges(changes: SimpleChanges): void {
  }
  constructor(private formValidator: FormValidator,
    private fb:FormBuilder,
    private appPreference: AppPreference,
    private managerig: ManageRigManifestComponent,
    private masterService: MasterServices,
    private dmsService: DmsService
  ) {
    this.initializeForm()
  }

  initializeForm(){
    this.isEdit=false

  this.rigForm = new FormGroup({
    formName: new FormControl("rigForm"),
    name: new FormControl('', [Validators.required]),
    rigmanifest_date: new FormControl('', [Validators.required]),
    code: new FormControl(''),
    description: new FormControl(''),
    upload: new FormControl('')
  })
  }
  ngOnInit(): void {
    this.setupEdit()
    this.getProfile()
  }

  onSelect(event: { addedFiles: any; }) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
    this.managerig.getRig();
    this.loader = false;
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }


  getProfile() {
    this.userData = {
      data: this.appPreference.getObject(PreferenceKeys.PROFILE_INFO)
    }
  }

  async addRig() {
    if (this.rigForm.invalid) {
      this.rigForm.markAllAsTouched()
    } else {
      var rigmanifest_date: any = moment(this.rigForm.get('rigmanifest_date')?.value).add(1, 'days').format("YYYY/MM/DD")
      this.buttonLoader = true
      this.buttondisable = true
      var temp:any = {
        // "formName": this.rigForm.get('rigForm')?.value
        "rig_owner_id": this.userData?.data?.owner_id,
        "name": this.rigForm.get('name')?.value,
        "rigmanifest_date": rigmanifest_date,
        "code": this.rigForm.get('code')?.value,
        "description": this.rigForm.get('description')?.value,
      }

      // const folderData = {
      //   folderName: FOLDERS.RIG
      // }

      // const folderResult: any = await firstValueFrom(this.dmsService.getFolder(folderData))
      // const folderId = folderResult.result[0].id

      // const rigData = new FormData();
      // rigData.append("document", this.rigFile, "document")
      // const rigResult: any = await firstValueFrom(this.dmsService.upload(rigData, folderId))
      // temp.upload = rigResult.result

      // console.log("rigresult", rigResult)

      this.masterService.addRig(temp).subscribe({
        next: (res) => {
          this.handleSuccess("Rig Added Successfully");
          this.formData(res)
          this.reset();
          this.buttonLoader = false
          this.buttondisable = false
        },
        error: (e: any) => {
          this.buttonLoader = false
          this.handleError(e)
          this.buttondisable = false

        }
      })
    }
  }

  formData(res: any) {
    this.rigFormData = res['rigManifest']
    console.log(this.rigFormData)
  }

  // prepareFilesList(files: Array<any>, type: string){
  //   for(const items of files){
  //     if (files.length > 0) {
  //       const file = items;
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);
  //       reader.onload = () => {
  //         items.base64 = reader.result?.toString().split(",")[1];
  //       };
  //       // this.files.push(items);
  //       if (type == "rig"){
  //         this.rigFile = items
  //       }
  //     } else {
  //       this.appPreference.showWarning("Please upload a file");
  //     }
  //   }
  // }

  // uploadFile(event:any, type: string){
  //   const files = event.target.files;
  //   const fileArray = Array.from(files).filter(function (obj: any) {
  //     return obj.size <= FILE_UPLOAD_LIMIT && supportedFileTypes.includes(obj.type);
  //   });
  //   const rejectedFiles = Array.from(files).filter(function (obj: any) {
  //     return obj.size > FILE_UPLOAD_LIMIT || !supportedFileTypes.includes(obj.type);
  //   });

  //   if (rejectedFiles.length > 0) {
  //     var result = rejectedFiles.map(function (e: any) {
  //       return e.name;
  //     }).join(', ');
  //     this.appPreference.showWarning(`Following files are above 10MB or not supported: ${result}`);
  //   }
  //   this.prepareFilesList(fileArray, type);
  //   console.log("events", files)
  // }

  setupEdit() {
    this.managerig.editData.subscribe({
      next: (data: any) => {
        this.id = data.id
        this.isEdit = true
        this.rigForm.get('name')?.patchValue(data.name)
        this.rigForm.get('rigmanifest_date')?.patchValue(data.rigmanifest_date)
        this.rigForm.get('code')?.patchValue(data.code)
        this.rigForm.get('description')?.patchValue(data.description)
        // this.rigForm.get('upload')?.patchValue(data.upload)
        console.log("Rigdata", data)
      }, error: (e) => {
        this.handleError(e);
        this.reset()
      }
    })
  }

  async editRig() {
    this.buttonLoader = true
    var rigmanifest_date: any = moment(this.rigForm.get('rigmanifest_date')?.value).add(1, 'days').format("YYYY/MM/DD")
    var temp:any = {
      "id": this.id,
      "name": this.rigForm.get('name')?.value,
      "rigmanifest_date": rigmanifest_date,
      "code": this.rigForm.get('code')?.value,
      "description": this.rigForm.get('description')?.value,
    }

    // const folderData = {
    //   folderName: FOLDERS.RIG
    // }

    // const folderResult: any = await firstValueFrom(this.dmsService.getFolder(folderData))
    // const folderId = folderResult.result[0].id

    // const rigData = new FormData();
    // rigData.append("document", this.rigFile, "document")
    // const rigResult: any = await firstValueFrom(this.dmsService.upload(rigData, folderId))
    // temp.upload = rigResult.result

    // console.log("rigresult", rigResult)


    this.masterService.editRig(temp).subscribe({
      next: (res: any) => {
        this.handleSuccess("Rig Edit Successfully");
        this.reset();
        this.buttonLoader = false
      }, error: (e) => {
        this.handleError(e)
      }
    })
  }

  reset() {
    this.isEdit = false
    this.managerig.getRig()
    this.initializeForm()
    // this.rigForm.reset()
    // window.location.reload()
    this.rigForm.patchValue({
      "formName": "rigForm"
    })
    UIkit.modal("#add-rig-manifest").hide();
  }

  getError(formGroup: FormGroup, controlName: any) {
    return this.formValidator.getErrorForControl(formGroup, controlName);
  }

}
