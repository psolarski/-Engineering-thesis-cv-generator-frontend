import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthGuard } from '../../shared/guards/auth-guard.service';
import { FieldErrorDisplayModule } from '../../shared/validations/error/field-error-display.module';
import { CreateProjectComponent } from './create-project.component';
import { DirectiveModule } from '../../shared/directives/directive.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

const createProjectRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: "profile/:username/create-project",
    component: CreateProjectComponent,
    canActivate: [AuthGuard]
  }
]);
@NgModule({
  declarations: [
    CreateProjectComponent
  ],
  imports: [
    SharedModule,
    FieldErrorDisplayModule,
    DirectiveModule,
    createProjectRouting
  ],
  providers: [
    AuthGuard,
    FieldErrorDisplayModule
  ]
})
export class CreateProjectModule {}
