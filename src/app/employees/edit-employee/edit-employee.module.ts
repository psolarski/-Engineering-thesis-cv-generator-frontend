import { ModuleWithProviders, NgModule } from '@angular/core';
import { EditEmployeeComponent } from './edit-employee.component';
import { AuthGuard } from '../../shared/guards/auth-guard.service';
import {  RouterModule } from '@angular/router';
import { DirectiveModule } from '../../shared/directives/directive.module';
import { SharedModule } from '../../shared/shared.module';
import { FieldErrorDisplayModule } from '../../shared/validations/error/field-error-display.module';
import { SharedTranslate } from '../../shared/shared-translate.module';

const editEmployeeRouting: ModuleWithProviders = RouterModule.forChild([
  {
   path: 'profile/:username/edit',
   component: EditEmployeeComponent,
   canActivate: [AuthGuard]
  }
]);

@NgModule({
  providers: [
    AuthGuard
  ],
  imports: [
    editEmployeeRouting,
    DirectiveModule,
    SharedModule,
    FieldErrorDisplayModule,
    SharedTranslate
  ],
  declarations: [
    EditEmployeeComponent
  ]
})
export class EditEmployeeModule {}
