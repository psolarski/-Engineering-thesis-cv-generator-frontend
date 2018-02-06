import { ModuleWithProviders, NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../shared/guards/auth-guard.service';
import { DirectiveModule } from '../../shared/directives/directive.module';
import { SharedTranslate } from '../../shared/shared-translate.module';

const profileRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: "profile/:username",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
]);

@NgModule({
  imports: [
    SharedModule,
    profileRouting,
    DirectiveModule,
    SharedTranslate
  ],
  declarations:[
    ProfileComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class ProfileModule { }
