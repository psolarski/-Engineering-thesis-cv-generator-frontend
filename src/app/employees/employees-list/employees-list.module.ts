import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthGuard } from '../../shared/guards/auth-guard.service';
import { RouterModule } from '@angular/router';
import { EmployeesListComponent } from './employees-list.component';
import { SharedModule } from '../../shared/shared.module';
import { EmployeesFilterPipe } from './employees-filter.pipe';
import { DirectiveModule } from '../../shared/directives/directive.module';
import { SharedTranslate } from '../../shared/shared-translate.module';

const employeeListRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: "employees",
    component: EmployeesListComponent,
    canActivate: [AuthGuard]
  }
]);
@NgModule({
  imports: [
    SharedModule,
    employeeListRouting,
    DirectiveModule,
    SharedTranslate
  ],
  declarations: [
    EmployeesListComponent,
    EmployeesFilterPipe
  ],
  providers: [
    AuthGuard,
    EmployeesFilterPipe
  ]
})
export class EmployeesListModule { }
