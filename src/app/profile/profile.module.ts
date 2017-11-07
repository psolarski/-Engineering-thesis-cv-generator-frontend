import { ModuleWithProviders, NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth-guard.service';

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
    profileRouting
  ],
  declarations:[
    ProfileComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class ProfileModule { }
