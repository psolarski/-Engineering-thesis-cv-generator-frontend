import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthGuard } from '../../shared/guards/auth-guard.service';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DirectiveModule } from '../../shared/directives/directive.module';
import { OutlookComponent } from './outlook.component';
import { FieldErrorDisplayModule } from '../../shared/validations/error/field-error-display.module';
import { SharedTranslate } from '../../shared/shared-translate.module';

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
    DirectiveModule,
    FieldErrorDisplayModule,
    SharedTranslate
  ],
  declarations:[
    OutlookComponent
  ],
  providers: [
    AuthGuard,
    FieldErrorDisplayModule
  ]
})
export class OutlookModule {}
