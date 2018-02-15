import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EmployeeService } from '../../shared/services/employee.service';
import {Location} from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../shared/models/employee.model';

@Component({
  selector: "change-password",
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  currentEmployeeUsername: string;
  isSubmitting: boolean;
  passwordForm: FormGroup;
  errorMessage: string;
  exception: boolean;
  currentEmployee: Employee;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.isSubmitting = false;
  }

  ngOnInit(): void {
    this.currentEmployeeUsername = this.route.snapshot.paramMap.get('username');
    this.employeeService.getEmployee(this.currentEmployeeUsername).subscribe(employee => {
      this.currentEmployee = employee.body;
      this.createForm();
    });
  }
  submitForm() {
    this.isSubmitting = true;
    if (this.passwordForm.valid) {
      console.log('form submitted');
      this.employeeService.changePassword(this.passwordForm.value, this.currentEmployeeUsername, this.currentEmployee)
        .subscribe(data => {
          this.router.navigate(["/profile/" + this.currentEmployeeUsername]);
        }, error => {
            this.errorMessage = error.message;
            this.exception = true;
            setTimeout(function() {
              this.exception = false;
            }.bind(this), 8000);
          }
      );
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
