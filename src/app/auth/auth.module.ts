import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './auth-guard.service';

const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: "login",
    component: AuthComponent,
    canActivate: [AuthGuard]
  }
]);

@NgModule({
  imports: [
    SharedModule,
    authRouting
  ],
  declarations: [
    AuthComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class AuthModule {}
