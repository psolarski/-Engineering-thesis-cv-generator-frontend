import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../shared/services/employee.service';
import { Employee } from '../shared/models/employee.model';


@Component({
  selector: `profile-page`,
  templateUrl: `./profile.component.html`,
  styleUrls: [`./profile.component.css`]
})
export class ProfileComponent implements OnInit {
  name: string;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  currentEmployee: Employee;

  ngOnInit() {
    this.employeeService.currentEmployee.subscribe(
      (employeeData: Employee) => {
        this.currentEmployee = employeeData;
        this.name = employeeData.username;
      }
    );
  }
}
