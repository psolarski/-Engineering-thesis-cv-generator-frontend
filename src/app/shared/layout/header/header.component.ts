import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: `layout-header`,
  templateUrl: `./header.component.html`,
  styleUrls: [`./header.component.css`]
})
export class HeaderComponent implements OnInit {

  currentEmployeeUsername: String;

  constructor(
    private employeeService: EmployeeService
  ) {}


  ngOnInit(): void {
    this.employeeService.currentEmployee.subscribe(
      data => {
        this.currentEmployeeUsername = data.username;
      }
    );
  }

  logout(): void {
    this.employeeService.purgeAuth()
  }
}
