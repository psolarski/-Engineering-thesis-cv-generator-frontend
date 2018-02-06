import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EducationComponent } from './education.component';
import { AuthGuard } from '../../shared/guards/auth-guard.service';
import { SharedModule } from '../../shared/shared.module';
import { DeveloperSharedModule } from '../shared/developer.shared.module';
import { SharedTranslate } from '../../shared/shared-translate.module';

const educationRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: "education",
    component: EducationComponent,
    canActivate: [AuthGuard]

  }
]);
@NgModule({
  imports: [
    SharedModule,
    educationRouting,
    DeveloperSharedModule,
    SharedTranslate
  ],
  declarations: [
    EducationComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class EducationModule {}
