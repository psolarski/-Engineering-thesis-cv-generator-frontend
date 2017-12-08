import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EmployeeService } from '../../shared/services/employee.service';
import { Employee } from '../../shared/models/employee.model';

import 'rxjs/add/operator/switchMap';


@Component({
  selector: `profile-page`,
  templateUrl: `./profile.component.html`,
  styleUrls: [`./profile.component.css`]
})
export class ProfileComponent implements OnInit {
  name: string;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
  ) {}

  currentEmployee: Employee;

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.employeeService.getEmployee(params.get('username')))
      .subscribe(employee => {
          this.currentEmployee = employee.body;
        console.log("NAME OF EMPLOYEE: " + this.currentEmployee.roles[0].name);
      });
  }
}
