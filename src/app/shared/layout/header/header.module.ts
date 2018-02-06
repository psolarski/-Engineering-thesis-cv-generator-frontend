import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { HeaderComponent } from './header.component';
import { NotificationModule } from '../../../developers/notifications/notification.module';
import { RouterModule } from '@angular/router';
import { DirectiveModule } from '../../directives/directive.module';
import { SharedTranslate } from '../../shared-translate.module';

@NgModule({
  imports: [
    SharedModule,
    NotificationModule,
    RouterModule,
    DirectiveModule,
    SharedTranslate
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
