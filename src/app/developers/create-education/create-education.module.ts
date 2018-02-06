import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthGuard } from '../../shared/guards/auth-guard.service';
import { CreateEducationComponent } from './create-education.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { FieldErrorDisplayModule } from '../../shared/validations/error/field-error-display.module';
import { DirectiveModule } from '../../shared/directives/directive.module';
import { SharedTranslate } from '../../shared/shared-translate.module';

const createEducationRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: "profile/:username/create-education",
    component: CreateEducationComponent,
    canActivate: [AuthGuard]
  }
]);
@NgModule({
  imports: [
    SharedModule,
    FieldErrorDisplayModule,
    DirectiveModule,
    createEducationRouting,
    SharedTranslate
  ],
  declarations: [
    CreateEducationComponent
  ],
  providers: [
    AuthGuard,
    FieldErrorDisplayModule
  ]
})
export class CreateEducationModule {}
