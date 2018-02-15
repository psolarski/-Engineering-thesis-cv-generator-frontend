import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EmployeeService } from '../shared/services/employee.service';

@Component({
  selector: `auth-page`,
  templateUrl: `./auth.component.html`,
  styleUrls: [`./auth.component.css`]
})
export class AuthComponent {
  isSubmitting = false;
  authForm: FormGroup;
  credentials;
  exception: boolean;

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private fb: FormBuilder,
  ) {

    this.authForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
      'type': ['developer'],
    });
  }

  submitForm() {
    this.isSubmitting = true;

    this.credentials = this.authForm.value;
    this.employeeService.attemptAuth(this.credentials)
      .subscribe(data => {
        setTimeout(() => {
          console.log(`Logged in, navigate!`);
          this.router.navigate([`/profile/` + this.credentials.username]);
        },300)
      }, error => {
        this.exception = true;
        this.isSubmitting = false;
        this.authForm.reset();
        setTimeout(function() {
          this.exception = false;
        }.bind(this), 8000);
      console.log(`Error during login occurred!` + error);
    });
  }
}
