import { Component, OnInit } from '@angular/core';
import { DeveloperService } from '../../shared/services/developer.service';
import { EmployeeService } from '../../shared/services/employee.service';
import { Notification } from '../../shared/models/notification.model';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: [ './notification.component.css' ]
})
export class NotificationComponent implements OnInit {

  notifications: Notification[];

  constructor(
    private developerService: DeveloperService,
    private employeeService: EmployeeService
  ) {

  }

  ngOnInit(): void {
    this.employeeService.currentEmployee.subscribe(
      data => {
        if(data.username !== undefined && data.roles.filter(function(e) { return e.name === 'DEV'; }).length > 0) {
        this.developerService.getDeveloper(data.username).subscribe(
          data => {
            this.notifications = data.body.notifications;
            return this.notifications;
          }, err => {
            console.log("Error NotificationComponent: " + err.message);
          }
        );
      }}
    );
  }
}
