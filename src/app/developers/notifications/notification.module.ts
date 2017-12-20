import { NgModule } from '@angular/core';
import { NotificationComponent } from './notification.component';
import { AuthGuard } from '../../shared/guards/auth-guard.service';
import { SharedModule } from '../../shared/shared.module';
import { DirectiveModule } from '../../shared/directives/directive.module';


@NgModule({
  imports: [
    SharedModule,
    DirectiveModule
  ],
  declarations: [
    NotificationComponent
  ],
  providers: [
    AuthGuard
  ],
  exports: [
    NotificationComponent
  ]
})
export class NotificationModule {}
