import { NgModule } from '@angular/core';
import { DevelopersFilterPipe } from './developers-filter.pipe';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    DevelopersFilterPipe
  ],
  declarations: [
    DevelopersFilterPipe
  ],
  providers: [

  ]
})
export class DeveloperSharedModule {

}
