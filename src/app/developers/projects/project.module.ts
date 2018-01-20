import { AuthGuard } from '../../shared/guards/auth-guard.service';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProjectComponent } from './project.component';
import { DeveloperSharedModule } from '../shared/developer.shared.module';

const projectRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: "projects",
    component: ProjectComponent,
    canActivate: [AuthGuard]
  }
]);
@NgModule({
  imports: [
    projectRouting,
    SharedModule,
    DeveloperSharedModule
  ],
  declarations: [
    ProjectComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class ProjectModule {}
