import { Component, OnInit } from '@angular/core';
import { Employee } from '../../shared/models/employee.model';
import { EmployeeService } from '../../shared/services/employee.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Location} from '@angular/common';
import { DeveloperService } from '../../shared/services/developer.service';
import { Role } from '../../shared/models/role.model';

@Component({
  selector: 'create-employee',
  styleUrls: ['./create-employee.component.css'],
  templateUrl: './create-employee.component.html'
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  newEmployee: Employee;
  isSubmitting: boolean;
  role: Role;

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private location: Location,
    private developerService: DeveloperService
  ) {
    this.isSubmitting = false;
    this.newEmployee = new Employee();
    this.role = new Role();
  }

  ngOnInit(): void {
    this.createForm();
  }

  submitForm() {
    this.isSubmitting = true;
    if (this.employeeForm.valid) {
      console.log('form submitted');
      switch (this.employeeForm.controls['roles'].get('name').value) {
        case 'DEV': {
          console.log("CREATE DEV");
          this.newEmployee.type = "developer";
          this.newEmployee.creationDate = this.getCurrentDateAsString();
          this.assigneRole("DEV");
          this.developerService.createDeveloper(this.newEmployee);
          break;
        }
        case 'ADMIN': {
          console.log("CREATE ADMIN");
          this.newEmployee.type = "administrator";
          this.newEmployee.creationDate = this.getCurrentDateAsString();
          this.assigneRole("ADMIN");
          this.employeeService.createEmployee(this.newEmployee);
          break;
        }
        case 'HR': {
          console.log("CREATE HR");
          this.newEmployee.type = "human-resource";
          this.newEmployee.creationDate = this.getCurrentDateAsString();
          this.assigneRole("HR");
          this.employeeService.createEmployee(this.newEmployee);
          break;
        }
      }
      console.log(this.newEmployee);
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

  private assigneRole(roleName: string) {
    this.role.name = roleName;
    this.newEmployee.roles = [];
    this.newEmployee.roles[0] = this.role;
  }

  private getCurrentDateAsString(): string {
    return new Date().toISOString().substring(0, 10);
  }
}
