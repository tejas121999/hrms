import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterServices } from 'src/app/services/master-services';
import { AppPreference, PreferenceKeys } from 'src/app/shared/app-preference';
import { FormValidator } from 'src/app/shared/managers/form-validators';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  [x: string]: any;
  showPassword = false;


  input: any;
  constructor(
    private formValidator: FormValidator,
    private masterService: MasterServices,
    private appPreference: AppPreference,
    public router: Router
  ) { }

  loginForm = new FormGroup({
    formName: new FormControl("generalForm"),
    work_email: new FormControl('admin@gmail.com', [Validators.required]),
    password: new FormControl('admin@123', [Validators.required])
  })

  preferenceKeys = PreferenceKeys;
  loader: boolean = false;

  ngOnInit(): void {
    this.appPreference.clearPreference();
  }

  handleSuccess(msg: any) {
    this.appPreference.showSuccess(msg)
  }

  handleError(msg: any) {
    this.appPreference.showWarning(msg)
  }

  reset() {
  }

  login() {
    this.loader = true;

    this.masterService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.handleSuccess("Logged in successfully")
        this.reset()
        this.appPreference.setAccessToken(res.Token)
        // this.appPreference.setAccessPermission(res.access)
        console.log("=================", res)
        this.setUserData(res.user)
        this.setEmpData(res.employee_data)
        if (!res.access) {
          this.setUserPermission(res.access_2)
        } else {
          this.setUserPermission(res.access)
        }


        setTimeout(() => {
          this.loader = false;
          if (res.user.isFirst == true) {
            console.log(" res.users", res.user)
            this.router.navigate(["/setting/first-setup"]);
            this.appPreference.setObject(this.preferenceKeys.BRANCH, res.user.isBranch)
            this.appPreference.setObject(this.preferenceKeys.COMPANY, res.user.isCompany)
            this.appPreference.setObject(this.preferenceKeys.DEPARTMENT, res.user.isDepartment)
            this.appPreference.setObject(this.preferenceKeys.DESIGNATION, res.user.isDesignation)
          } else {
            this.appPreference.setObject(this.preferenceKeys.BRANCH, res.user.isBranch)
            this.appPreference.setObject(this.preferenceKeys.COMPANY, res.user.isCompany)
            this.appPreference.setObject(this.preferenceKeys.DEPARTMENT, res.user.isDepartment)
            this.appPreference.setObject(this.preferenceKeys.DESIGNATION, res.user.isDesignation)
            this.router.navigate(["/setting/dashboard"]);
          }
        }, 2000);
      }, error: (e: any) => {
        console.log(e)
        let errormessage
        if (e?.error?.error) {
          errormessage = e?.error?.error;
        } else {
          errormessage = e?.error?.msg;
        }

        this.handleError(errormessage)

        this.loader = false
      }
    })



  }

  toggleeyebtn() {
    this.showPassword = !this.showPassword;
  }
  setUserData(data: any) {
    this.appPreference.setObject(this.preferenceKeys.PROFILE_INFO, data)
  }

  setEmpData(data: any) {
    this.appPreference.setObject(this.preferenceKeys.EMPLOYEE_DATA, data)
  }



  setUserPermission(data: any) {
    console.log(data);

    this.appPreference.setObject(this.preferenceKeys.ACCESS, data)
  }
}
