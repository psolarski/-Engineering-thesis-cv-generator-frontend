import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { NoAuthGuard } from '../shared/guards/no-auth-guard.service';
import { SharedTranslate } from '../shared/shared-translate.module';

const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: "login",
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  }
]);

@NgModule({
  imports: [
    SharedModule,
    authRouting,
    SharedTranslate
  ],
  declarations: [
    AuthComponent
  ],
  providers: [
    NoAuthGuard
  ]
})
export class AuthModule {}
