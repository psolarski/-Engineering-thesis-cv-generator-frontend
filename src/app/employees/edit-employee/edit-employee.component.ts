import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../shared/models/employee.model';
import { Role } from '../../shared/models/role.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeeService } from '../../shared/services/employee.service';
import { EditEmployeeDto } from '../../shared/models/dto/edit-employee.dto';

@Component({
  selector: `edit-employee`,
  templateUrl: `./edit-employee.component.html`,
  styleUrls: [`./edit-employee.component.css`]
})
export class EditEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  currentEmployee: EditEmployeeDto;
  employee: Employee;
  isSubmitting: boolean;
  role: Role;
  username: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private employeeService: EmployeeService,
              private formBuilder: FormBuilder,
              private location: Location) {
    this.isSubmitting = false;
    this.currentEmployee = new EditEmployeeDto();
    this.role = new Role();
  }

  ngOnInit(): void {
    this.createForm();
    this.username = this.route.snapshot.paramMap.get('username');
    this.employeeService.getEmployee(this.route.snapshot.paramMap.get('username'))
        .subscribe(data => {
          this.employee = data.body;

          this.currentEmployee.address = this.employee.address;
          this.currentEmployee.email = this.employee.email;
          this.currentEmployee.name = this.employee.name;
          this.currentEmployee.phone = this.employee.phone;
          this.currentEmployee.roles = this.employee.roles;
          this.currentEmployee.surname = this.employee.surname;
          this.currentEmployee.type = this.employee.type;
          this.employeeForm.controls['roles'].get('name').setValue(this.currentEmployee.type);
          console.log(this.employeeForm.controls['roles'].get('name').value);
        });
  }

  submitForm() {
    this.isSubmitting = true;
    if (this.employeeForm.valid) {
      console.log('form submitted');
      switch (this.employeeForm.controls[ 'roles' ].get('name').value) {
        case 'DEV': {
          console.log("CREATE DEV");
          this.currentEmployee.type = "developer";
          this.assigneRole("DEV");
          break;
        }
        case 'ADMIN': {
          console.log("CREATE ADMIN");
          this.currentEmployee.type = "administrator";
          this.assigneRole("ADMIN");
          break;
        }
        case 'HR': {
          console.log("CREATE HR");
          this.currentEmployee.type = "human-resource";
          this.assigneRole("HR");
          break;
        }
      }
      this.employeeService.updateEmployee(this.username, this.currentEmployee).subscribe();
      console.log(this.currentEmployee);
      this.router.navigate([ "/profile/" + this.username ]);
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
      'email': [ '',
        [ Validators.required,
          Validators.email ]
      ],
      'phone': [ '',
        [ Validators.required,
          Validators.minLength(7),
          Validators.maxLength(9) ]
      ],
      address: this.formBuilder.group({
        city: [ '',
          [ Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50) ]
        ],
        street: [ '',
          [ Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50) ]
        ],
        number: [ '',
          [ Validators.required,
            Validators.min(1),
            Validators.max(300) ]
        ],
      }),
      roles: this.formBuilder.group({
        name: [ '', [ Validators.required ] ]
      })
    })
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

  goBackClicked(): void {
    this.location.back();
  }

  private assigneRole(roleName: string) {
    this.role.name = roleName;
    this.currentEmployee.roles = [];
    this.currentEmployee.roles[ 0 ] = this.role;
  }

  isAdmin(): boolean {
    return this.currentEmployee.roles.filter(function(e) { return e.name === 'ADMIN'; }).length > 0;
  }
}
