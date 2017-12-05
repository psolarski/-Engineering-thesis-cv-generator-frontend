import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { Errors } from '../shared/models/errors.model';
import { EmployeeService } from '../shared/services/employee.service';

@Component({
  selector: `auth-page`,
  templateUrl: `./auth.component.html`,
  styleUrls: [`./auth.component.css`]
})
export class AuthComponent {
  isSubmitting = false;
  authForm: FormGroup;
  errors: Errors = new Errors();
  credentials;

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private fb: FormBuilder,
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
      'type': ['developer'],
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = new Errors();

    this.credentials = this.authForm.value;
    // console.log(this.credentials);
    this.employeeService.attemptAuth(this.credentials)
      .subscribe(data => {
        setTimeout(() => {
          console.log(`Logged in, navigate!`);
          this.router.navigate([`/profile/admin`]);
        },300)
      }, error => {
      console.log(`Error during login occurred!` + error);
    });
  }
}
