import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthGuard } from '../../shared/guards/auth-guard.service';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DirectiveModule } from '../../shared/directives/directive.module';
import { OutlookComponent } from './outlook.component';

const outlookRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: "outlook",
    component: OutlookComponent,
    canActivate: [AuthGuard]
  }
]);

@NgModule({
  imports: [
    SharedModule,
    outlookRouting,
    DirectiveModule
  ],
  declarations:[
    OutlookComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class OutlookModule {}
