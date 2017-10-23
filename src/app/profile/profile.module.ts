import { ModuleWithProviders, NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

const profileRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: "profile/:username",
    component: ProfileComponent
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
  providers:
  [],
})
export class ProfileModule { }
