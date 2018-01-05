import { DirectiveModule } from '../../shared/directives/directive.module';
import { SharedModule } from '../../shared/shared.module';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FieldErrorDisplayModule } from '../../shared/validations/error/field-error-display.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../shared/guards/auth-guard.service';
import { CreateSkillComponent } from './create-skill.component';

const createSkillRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: "profile/:username/create-skill",
    component: CreateSkillComponent,
    canActivate: [AuthGuard]
  }
]);
@NgModule({
  declarations: [
    CreateSkillComponent
  ],
  imports: [
    SharedModule,
    FieldErrorDisplayModule,
    DirectiveModule,
    createSkillRouting
  ],
  providers: [
    AuthGuard,
    FieldErrorDisplayModule
  ]
})
export class CreateSkillModule {}
