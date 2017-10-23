import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CanActivate } from '@angular/router';
import { EmployeeService } from '../shared/services/employee.service';

import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private employeeService: EmployeeService
  ) {}

  canActivate(): Observable<boolean> {

    console.log(`Authentication: ` + this.employeeService.isAuthenticated.take(1).map(bool => !bool));
    return this.employeeService.isAuthenticated.take(1).map(bool => !bool)
  }
}
