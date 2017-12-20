import { NgModule } from '@angular/core';
import { AdminDirective } from './admin.directive';
import { DeveloperDirective } from './developer.directive';
import { ShowAuthenticatedDirective } from './show-authenticated.directive';

@NgModule({
  declarations: [
    AdminDirective,
    DeveloperDirective,
    ShowAuthenticatedDirective
  ],
  exports: [
    AdminDirective,
    DeveloperDirective,
    ShowAuthenticatedDirective
  ]
})
export class DirectiveModule {}
