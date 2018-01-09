import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OutlookService } from '../../shared/services/outlook.service';
import { Message } from '../../shared/models/outlook/message.model';
import { EmployeeService } from '../../shared/services/employee.service';

@Component({
  templateUrl: './outlook.component.html',
  styleUrls: ['./outlook.component.css'],
  selector: 'outlook'
})
export class OutlookComponent implements OnInit {

  developerUsername: string;
  outlookToken: String;
  messages: Message[];

  constructor(
    private employeeService: EmployeeService,
    private outlookService: OutlookService
  ) {}

  ngOnInit(): void {
    this.employeeService.currentEmployee.subscribe(data => {
      this.developerUsername = data.username;
      this.outlookService.getAllMessages(this.developerUsername).subscribe(data => {
        console.log(data);
        console.log(data.body);
        this.messages = data.body;
      });
    });

    this.outlookToken = this.outlookService.getToken();
  }
}
