import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { EmployeeService } from '../services/employee.service';

@Directive({
  selector: `[showDeveloper]`
})
export class DeveloperDirective implements OnInit {

  constructor(
    private employeeService: EmployeeService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    this.employeeService.currentEmployee.subscribe(data => {
      if (data.roles.filter(function(e) { return e.name === 'DEV'; }).length > 0) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    })
  }
}
