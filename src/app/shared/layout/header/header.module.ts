import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { HeaderComponent } from './header.component';
import { NotificationModule } from '../../../developers/notifications/notification.module';
import { RouterModule } from '@angular/router';
import { DirectiveModule } from '../../directives/directive.module';

@NgModule({
  imports: [
    SharedModule,
    NotificationModule,
    RouterModule,
    DirectiveModule
  ],
  declarations: [
    HeaderComponent
  ],
  providers: [
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule {}
