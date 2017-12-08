import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { EmployeeService } from '../services/employee.service';

@Directive({
  selector: `[showAdmin]`
})
export class AdminDirective implements OnInit {

  constructor(
    private employeeService: EmployeeService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    this.employeeService.currentEmployee.subscribe(data => {
      console.log("CONDITION: " + (data.roles.filter(function(e) { return e.name === 'ADMIN'; }).length > 0));
      if (data.roles.filter(function(e) { return e.name === 'ADMIN'; }).length > 0) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    })
  }
}
