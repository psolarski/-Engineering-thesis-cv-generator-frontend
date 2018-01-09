import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './shared/services/employee.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OutlookService } from './shared/services/outlook.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private outlookService: OutlookService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.employeeService.populate();
    this.activatedRoute.fragment.subscribe((fragment: String) => {
      if(fragment) {
        console.log("Fragment: " + fragment);
        let outlookToken =  fragment.substr(0, fragment.indexOf('&')).substr(13, fragment.length);
        console.log("Token: " + outlookToken);
        this.outlookService.saveToken(outlookToken);
        this.router.navigate(['/outlook']);
      }
    });
  }
}
