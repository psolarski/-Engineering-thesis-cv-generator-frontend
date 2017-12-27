import { ModuleWithProviders, NgModule } from '@angular/core';
import { ChangePasswordComponent } from './change-password.component';
import { AuthGuard } from '../../shared/guards/auth-guard.service';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { FieldErrorDisplayModule } from '../../shared/validations/error/field-error-display.module';
import { DirectiveModule } from '../../shared/directives/directive.module';

const changePasswordRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: "profile/:username/password",
    component: ChangePasswordComponent,
    canActivate: [AuthGuard]
  }
]);
@NgModule({
  imports: [
    changePasswordRouting,
    SharedModule,
    FieldErrorDisplayModule,
    DirectiveModule
  ],
  declarations: [
    ChangePasswordComponent
  ],
  providers: [
    AuthGuard,
    FieldErrorDisplayModule
  ]
})
export class ChangePasswordModule {}
