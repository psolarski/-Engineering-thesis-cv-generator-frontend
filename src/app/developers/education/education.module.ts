import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EducationComponent } from './education.component';
import { AuthGuard } from '../../shared/guards/auth-guard.service';
import { SharedModule } from '../../shared/shared.module';
import { DevelopersFilterPipe } from './developers-filter.pipe';

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
    educationRouting
  ],
  declarations: [
    EducationComponent,
    DevelopersFilterPipe
  ],
  providers: [
    AuthGuard,
    DevelopersFilterPipe
  ]
})
export class EducationModule {}
