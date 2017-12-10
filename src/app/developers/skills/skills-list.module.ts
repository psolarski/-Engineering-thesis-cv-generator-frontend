import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SkillsListComponent } from './skills-list.component';
import { AuthGuard } from '../../shared/guards/auth-guard.service';
import { SharedModule } from '../../shared/shared.module';
import { DevelopersFilterPipe } from './developers-filter.pipe';

const skillsListRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: "skills",
    component: SkillsListComponent,
    canActivate: [AuthGuard]
  }
]);
@NgModule({
  imports: [
    skillsListRouting,
    SharedModule
  ],
  declarations: [
    SkillsListComponent,
    DevelopersFilterPipe
  ],
  providers: [
    AuthGuard,
    DevelopersFilterPipe
  ]
})
export class SkillsListModule { }
