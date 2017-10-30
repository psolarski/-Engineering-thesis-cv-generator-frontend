import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Subscription } from 'rxjs/Subscription';

@Directive({ selector: `[showAuthenticated]` })
export class ShowAuthenticatedDirective implements OnInit {
  employee: Subscription;

  constructor(
    private employeeService: EmployeeService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    this.employee = this.employeeService.isAuthenticated.subscribe(data => {
      if(data) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    })
  }
}
