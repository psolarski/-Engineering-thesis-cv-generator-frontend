import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../shared/services/employee.service';
import {Location} from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "change-password",
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  currentEmployeeUsername: string;
  isSubmitting: boolean;
  passwordForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.isSubmitting = false;
  }

  ngOnInit(): void {
    this.currentEmployeeUsername = this.route.snapshot.paramMap.get('username');
    this.createForm();
  };

  submitForm() {
    this.isSubmitting = true;
    if (this.passwordForm.valid) {
      console.log('form submitted');
      this.employeeService.changePassword(this.passwordForm.value, this.currentEmployeeUsername);
    } else {
      console.log("INVALID FORM AFTER SUBMITTING");
      this.validateAllFormFields(this.passwordForm);
      this.isSubmitting = false;
    }
  }

  private createForm(): void {
    this.passwordForm = this.formBuilder.group({
      'username': [this.currentEmployeeUsername],
      'oldPassword': [ '',
        [ Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64) ]
      ],
      'newPassword': [ '',
        [ Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64) ]
      ],
      'newPasswordConfirmed': [ '',
        [ Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64) ]
      ],
    }, { validator: this.checkIfPasswordsMatch('newPassword', 'newPasswordConfirmed') })
  }

  private checkIfPasswordsMatch(password: string, confirmedPassword: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[password],
        passwordConfirmationInput = group.controls[confirmedPassword];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
    }
  }

  isFieldValid(field: string) {
    return (
      (!this.passwordForm.get(field).valid && this.passwordForm.get(field).touched) ||
      (this.passwordForm.get(field).untouched && this.isSubmitting)
    );
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  goBackClicked() : void {
    this.location.back();
  }

  clearForm() {
    this.passwordForm.reset();
    this.isSubmitting = false;
  }
}
