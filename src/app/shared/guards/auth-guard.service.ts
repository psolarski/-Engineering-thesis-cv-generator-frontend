import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private employeeService: EmployeeService
  ) {}

  canActivate(): Observable<boolean> {

    console.log(`AuthGuard: ` + this.employeeService.isAuthenticated.take(1));
    return this.employeeService.isAuthenticated.take(1);
  }
}
