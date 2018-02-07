import { RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { SharedTranslate } from '../shared-translate.module';
import { AuthGuard } from '../guards/auth-guard.service';
import { Error403Component } from './error-403.component';
import { Error404Component } from './error-404.component';

const errorsRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'error/404',
    component: Error404Component,
    canActivate: [AuthGuard]
  },
  {
    path: 'error/403',
    component: Error403Component,
    canActivate: [AuthGuard]
  }
]);

@NgModule({
  providers: [
    AuthGuard
  ],
  imports: [
    SharedModule,
    SharedTranslate,
    errorsRouting
  ],
  declarations: [
    Error403Component,
    Error404Component
  ]
})
export class ErrorModule {}
