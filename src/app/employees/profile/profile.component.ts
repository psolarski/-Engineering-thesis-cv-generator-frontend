import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EmployeeService } from '../../shared/services/employee.service';
import { Employee } from '../../shared/models/employee.model';

import 'rxjs/add/operator/switchMap';
import { Developer } from '../../shared/models/developer.model';


@Component({
  selector: `profile-page`,
  templateUrl: `./profile.component.html`,
  styleUrls: [`./profile.component.css`]
})
export class ProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  currentEmployee: Employee;
  currentDeveloper: Developer;
  buttonAccess: boolean;

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.employeeService.getEmployee(params.get('username')))
      .subscribe(employee => {
          this.currentEmployee = employee.body;
          this.buttonAccess = this.isAdminHROrOwner();
          if(this.currentEmployee.roles.filter(function(e) { return e.name === 'DEV'; }).length > 0) {
            this.currentDeveloper = employee.body;
          }
      });
  }

  private isAdminHROrOwner(): boolean {
    let username = null;
    this.employeeService.currentEmployee.subscribe(data => {
      username = data.username;
    });

    if (this.currentEmployee.roles.filter(function(e) { return e.name === 'ADMIN'; }).length > 0) {
      return true;
    } else if (this.currentEmployee.roles.filter(function(e) { return e.name === 'HR'; }).length > 0) {
      return true;
    } else return this.currentEmployee.username === username;
  }

}
