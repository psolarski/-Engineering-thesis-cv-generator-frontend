import { Component, OnInit } from '@angular/core';
import { Employee } from '../../shared/models/employee.model';
import { EmployeeService } from '../../shared/services/employee.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Location} from '@angular/common';
import { DeveloperService } from '../../shared/services/developer.service';
import { log } from 'util';

@Component({
  selector: 'create-employee',
  styleUrls: ['./create-employee.component.css'],
  templateUrl: './create-employee.component.html'
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  newEmployee: Employee;
  isSubmitting: boolean;

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private location: Location,
    private developerService: DeveloperService
  ) {
    this.isSubmitting = false;
    this.newEmployee = new Employee();
  }

  ngOnInit(): void {
    this.createForm();
  }

  submitForm() {
    console.log("SUBMITTING");
    this.isSubmitting = true;
    if (this.employeeForm.valid) {
      console.log('form submitted');
      switch (this.employeeForm.controls['roles'].get('name').value) {
        case 'DEV': {
          this.developerService.createDeveloper(this.employeeForm.value);
          console.log("Created new developer");
          break;
        }
        case 'ADMIN': {

          break;
        }
        case 'HR': {

          break;
        }
      }
      this.router.navigate(["/employees"]);
    } else {
      console.log("INVALID FORM AFTER SUBMITTING");
      this.validateAllFormFields(this.employeeForm);
      this.isSubmitting = false;
    }
  }

  private createForm(): void {
    this.employeeForm = this.formBuilder.group({
      'name': [ '',
        [ Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40) ]
      ],
      'surname': [ '',
        [ Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40) ]
      ],
      'username': [ '',
        [ Validators.required,
          Validators.minLength(5),
          Validators.maxLength(40) ]
      ],
      'password': [ '',
        [ Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64) ]
      ],
      'confirmedPassword': [ '',
        [ Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64) ]
      ],
      'email': [ '',
        [ Validators.required,
          Validators.email ]
      ],
      'phone': [ '',
        [ Validators.required,
          Validators.minLength(7),
          Validators.maxLength(9)]
      ],
      address: this.formBuilder.group({
        city: [ '',
          [ Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)]
        ],
        street: [ '',
          [ Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)]
        ],
        number: [ '',
          [ Validators.required,
            Validators.min(1),
            Validators.max(300)]
        ],
      }),
      roles: this.formBuilder.group({
        name: [ '', [ Validators.required ] ]
      })
    }, { validator: this.checkIfPasswordsMatch('password', 'confirmedPassword') });
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
      (!this.employeeForm.get(field).valid && this.employeeForm.get(field).touched) ||
      (this.employeeForm.get(field).untouched && this.isSubmitting)
    );
  }

  clearForm() {
    this.employeeForm.reset();
    this.isSubmitting = false;
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
}
