import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  canActivate(): Observable<boolean> {

    console.log(`AuthGuard: ` + this.employeeService.isAuthenticated.subscribe(data => {
      console.log(`Authenticated: ` + data)
      if(data === false) {
        this.router.navigate(['/login']);
      }
    }));
    return this.employeeService.isAuthenticated.take(1);
  }
}
