import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinctUntilChanged';

import { Employee } from '../models/employee.model';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { Observable } from 'rxjs/Observable';
import { OutlookService } from './outlook.service';
import { EditEmployeeDto } from '../models/dto/edit-employee.dto';
import { Router } from '@angular/router';


@Injectable()
export class EmployeeService {

  private currentEmployeeSubject = new BehaviorSubject<Employee>(new Employee);
  public currentEmployee = this.currentEmployeeSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
    private apiService: ApiService,
    private jwtService: JwtService,
    private outlookService: OutlookService,
    private router: Router
  ) {}

  /**
   * Verify if any JTW token is stored in local storage.
   * If present fetch employee body from backend.
   */
  populate() {
    console.log(`Populating tokens ` + typeof this.jwtService.getToken() + " " + this.jwtService.getToken());
    if (this.jwtService.getToken() !== 'null' && this.jwtService.getToken() !== 'undefined'
      && this.jwtService.getToken() !== undefined && this.jwtService.getToken() !== null) {
      this.apiService.get('employees/employee').subscribe(data => {
        this.currentEmployeeSubject.next(data.body);
        this.isAuthenticatedSubject.next(true);
      }, error => {
          this.purgeAuth();
      });
    } else {
      this.purgeAuth();
      this.router.navigate(['/login']);
    }
  }

  /**
   * Attempt auth. If completed save JWT token
   * and fetch employee's body from backend with given JWT token.
   * @param credentials login and password
   * @returns {Observable<any>}
   */
  attemptAuth(credentials) {
    const response = this.apiService.login(credentials);
      response.subscribe(
      data => {
        this.jwtService.saveToken(data.headers.get(`Authorization`));
        this.fetchEmployeeData();
        }, error => error);
      return response;
  }

  /**
   * Fetch user body from backend
   */
  private fetchEmployeeData() {
    this.apiService.get('employees/employee')
      .subscribe(
        response => {
          this.currentEmployeeSubject.next(response.body);
          this.isAuthenticatedSubject.next(true);
      },
      error => {
          console.log("Error fetching data!" + error.message);
      })
  }

  /**
   * Logout. Destroy token from memory
   * set current Employee to empty object
   * and false to Subject isAuthenicated.
   */
  purgeAuth() {
    console.log("AUTH PURGE!");
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Remove Outlook token
    this.outlookService.destroyToken();
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
    // Set current employee to an empty object
    this.currentEmployeeSubject.next(new Employee());
  }

  /**
   * Get whole employee list
   * @returns {Observable<any>}
   */
  getEmployees(): Observable<any> {
    return this.apiService.get("employees");
  }


  getEmployee(username: string): Observable<any> {
    return this.apiService.get("employees/employee/" + username);
  }

  /**
   * Create new Employee
   * @param {Employee} newEmployee body
   */
  createEmployee(newEmployee: Employee): Observable<any> {
    return this.apiService.post("employees/employee/", newEmployee);
  }

  /**
   * Update Employees Password
   */
  changePassword(password: Object, username: string, employee: Employee): Observable<any>  {
    return this.apiService.putEmployeeChangePassword("employees/employee/" + username + "/password/", employee, password);
  }

  /*
   * Update Employee
   */
  updateEmployee(path: string, employee: EditEmployeeDto): Observable<any> {
    return this.apiService.putEmployee("/employees/employee/" + path, employee);
  }

  lockedAccount(path: string, employee: Employee): Observable<any> {
    return this.apiService.putEmployee("employees/employee/" + path, employee);
  }

  activateAccount(path: string, employee: Employee): Observable<any> {
    return this.apiService.putEmployee("employees/employee/" + path, employee);
  }
}
