import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { OutlookService } from '../../services/outlook.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: `layout-header`,
  templateUrl: `./header.component.html`,
  styleUrls: [`./header.component.css`]
})
export class HeaderComponent implements OnInit {

  currentEmployeeUsername: String;
  outlookAuthorizationURL: string;
  isOutlookTokenAvailable: boolean;

  constructor(
    private employeeService: EmployeeService,
    private outlookService: OutlookService
  ) {}


  ngOnInit(): void {
    this.employeeService.currentEmployee.subscribe(
      data => {
        this.currentEmployeeUsername = data.username;
        this.outlookAuthorizationURL = this.outlookService.buildAuthUrl();
        this.isOutlookTokenAvailable = !!this.outlookService.getToken();
      }
    );
  }

  logout(): void {
    this.employeeService.purgeAuth()
  }
}
