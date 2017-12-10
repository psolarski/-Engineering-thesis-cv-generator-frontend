import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../shared/services/employee.service';
import { Employee } from '../../shared/models/employee.model';

@Component({
  selector: `employees-list`,
  templateUrl: `./employees-list.component.html`,
  styleUrls: ['./employee-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  employees: Employee[];
  queryString: string;
  elementsCount: number;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ){
    this.elementsCount = 5;
    this.queryString = "";
  }

  ngOnInit(): void {
    console.log("Getting employee list");
    this.employeeService.getEmployees()
      .subscribe(employees => {
        this.employees = employees.body.list;
      });
  }
}
