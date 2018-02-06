import { DirectiveModule } from '../../shared/directives/directive.module';
import { SharedModule } from '../../shared/shared.module';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FieldErrorDisplayModule } from '../../shared/validations/error/field-error-display.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../shared/guards/auth-guard.service';
import { CreateSkillComponent } from './create-skill.component';
import { SharedTranslate } from '../../shared/shared-translate.module';


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
    createSkillRouting,
    SharedTranslate
  ],
  providers: [
    AuthGuard,
    FieldErrorDisplayModule
  ]
})
export class CreateSkillModule {}
