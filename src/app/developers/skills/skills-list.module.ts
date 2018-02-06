import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SkillsListComponent } from './skills-list.component';
import { AuthGuard } from '../../shared/guards/auth-guard.service';
import { SharedModule } from '../../shared/shared.module';
import { DeveloperSharedModule } from '../shared/developer.shared.module';
import { SharedTranslate } from '../../shared/shared-translate.module';

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
    SharedModule,
    DeveloperSharedModule,
    SharedTranslate
  ],
  declarations: [
    SkillsListComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class SkillsListModule { }
