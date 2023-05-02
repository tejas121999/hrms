import { FormControl, FormGroup } from "@angular/forms";
import { VALIDATION_MESSAGES } from "../config/formErrorMessages";
import { Injectable } from "@angular/core";
import { AppUtil } from "../app-utils";


@Injectable({
    providedIn: "root",
})
export class FormValidator {
    validationMessages = VALIDATION_MESSAGES;

    validateControl(
        controlName: string,
        control: any,
        formName: string
    ) {

        if (( control.dirty  ||  control.touched ) && control.invalid ) {

            //Get validation message of specific form
            let validationMessage: any = this.validationMessages[formName as keyof typeof this.validationMessages];

            //Get validation type of form control
            let formControlValidatons = validationMessage[controlName as keyof typeof validationMessage];

            //Iterate throught validation types
            for (var j = 0; j < formControlValidatons?.length; j++) {
                var validationType = formControlValidatons[j];
                var validationTypes = validationType.type.split("|");

                for (var k = 0; k < validationTypes.length; k++) {
                    //Check validation is succeed
                    if (control.hasError(validationTypes[k])) {
                        return validationType.message;
                    }
                }
            }
        }
        return "";
    }

    public static EmailWithPattern(control: FormControl) {
        const value = (control.value || "").trim();
        const isWhitespace = value.length === 0;
        let isValid = !isWhitespace;
        if (isValid) {
            isValid = AppUtil.isEmail(value);
        }
        return isValid ? null : { emailWithPattern: true };
    }

    getErrorForControl(formGroup: FormGroup, controlName: any) {

        let message = this.validateControl(
            controlName,
            formGroup.get(controlName),
            formGroup.value["formName"]
        );

        return message;
    }
}
