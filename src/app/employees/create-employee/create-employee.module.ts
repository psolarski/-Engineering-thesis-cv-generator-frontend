import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee.component';
import { AuthGuard } from '../../shared/guards/auth-guard.service';
import { SharedModule } from '../../shared/shared.module';
import { FieldErrorDisplayModule } from '../../shared/validations/error/field-error-display.module';

const createEmployeeRouting: ModuleWithProviders = RouterModule.forChild([
  {
   path: "employees/create-employee",
   component: CreateEmployeeComponent,
   canActivate: [AuthGuard]
  }
]);
@NgModule({
  imports: [
    createEmployeeRouting,
    SharedModule,
    FieldErrorDisplayModule
  ],
  declarations: [
    CreateEmployeeComponent
  ],
  providers: [
    AuthGuard,
    FieldErrorDisplayModule
  ]
})
export class CreateEmployeeModule {}
