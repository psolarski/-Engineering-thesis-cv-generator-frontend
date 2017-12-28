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
    private employeeService: EmployeeService,
  ) {
    this.generateRandomNumber();
  }

  currentEmployee: Employee;
  currentDeveloper: Developer;
  randomNumber: number;

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.employeeService.getEmployee(params.get('username')))
      .subscribe(employee => {
          this.currentEmployee = employee.body;
          if(this.currentEmployee.roles.filter(function(e) { return e.name === 'DEV'; }).length > 0) {
            this.currentDeveloper = employee.body;
          }
      });
  }

  generateRandomNumber() {
    this.randomNumber = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
  }
}
