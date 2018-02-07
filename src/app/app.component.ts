import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './shared/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OutlookService } from './shared/services/outlook.service';
import { TranslateService } from '@ngx-translate/core';

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
    private translate: TranslateService
  ) {
    let browserLanguage =  navigator.language;
    switch(browserLanguage) {
      case 'pl': {
        translate.setDefaultLang('pl');
        break;
      }
      case 'en':
      case 'en-US': {
        translate.setDefaultLang('en');
        break;
      }
      default: {
        translate.setDefaultLang('pl');
        break;
      }
    }
  }

  ngOnInit() {
    this.employeeService.populate();
    this.activatedRoute.fragment.subscribe((fragment: String) => {
      if(fragment) {
        let outlookToken =  fragment.substr(0, fragment.indexOf('&')).substr(13, fragment.length);
        // console.log("Token: " + outlookToken);
        this.outlookService.saveToken(outlookToken);
        this.router.navigate(['/outlook']);
      }
    });
  }
}
