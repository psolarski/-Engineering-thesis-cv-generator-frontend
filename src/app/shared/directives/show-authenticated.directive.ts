import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { EmployeeService } from '../services/employee.service';

@Directive({ selector: `[showAuthenticated]` })
export class ShowAuthenticatedDirective implements OnInit {

  constructor(
    private employeeService: EmployeeService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    this.employeeService.isAuthenticated.subscribe(data => {
      if(data) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }
}
