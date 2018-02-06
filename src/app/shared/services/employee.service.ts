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


@Injectable()
export class EmployeeService {

  private currentEmployeeSubject = new BehaviorSubject<Employee>(new Employee);
  public currentEmployee = this.currentEmployeeSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
    private apiService: ApiService,
    private jwtService: JwtService,
    private outlookService: OutlookService
  ) {}

  /**
   * Verify if any JTW token is stored in local storage.
   * If present fetch employee body from backend.
   */
  populate() {
    console.log(`Populating tokens`);
    if (this.jwtService.getToken()) {
      const response = this.apiService.get(`employees/employee`);
      response.subscribe(
        data => {
          // this.jwtService.saveToken(data.headers.get(`Authorization`));
          // this.fetchEmployeeData();
        },
        err => this.purgeAuth()
        )
    } else {
      this.purgeAuth();
    }
    this.purgeAuth();
    this.mockLogin();
  }

  mockLogin() {
    let credentials = {
      username: "dev1",
      password: "password",
      type: "developer"
    };
    this.apiService.login(credentials).subscribe(
      data => {
        this.isAuthenticatedSubject.next(true);
        this.jwtService.saveToken(data.headers.get(`Authorization`));
        this.fetchEmployeeData();
      }, error => error);
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
        this.isAuthenticatedSubject.next(true);
        this.jwtService.saveToken(data.headers.get(`Authorization`));
            this.fetchEmployeeData();
        }, error => error);
      return response;
  }

  /**
   * Fetch user body from backend
   */
  private fetchEmployeeData() {
    this.apiService.get(`employees/employee`)
      .subscribe(
        response => {
          this.currentEmployeeSubject.next(response.body);
      },
      error => error)
  }

  /**
   * Logout. Destroy token from memory
   * set current Employee to empty object
   * and false to Subject isAuthenicated.
   */
  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Remove Outlook token
    this.outlookService.destroyToken();
    // Set current employee to an empty object
    this.currentEmployeeSubject.next(new Employee());
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  /**
   * Get current logged in Employee
   * @returns {Employee} logged Employee
   */
  getCurrentEmployee(): Employee {
    return this.currentEmployeeSubject.value;
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
  changePassword(password: Object, username: string): Observable<any>  {
    return this.apiService.put("employees/employee/" + username + "/password/", password);
  }

  /*
   * Update Employee
   */
  updateEmployee(path: string, employee: EditEmployeeDto): Observable<any> {
    return this.apiService.put("/employees/employee/" + path, employee);
  }
}
