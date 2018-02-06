import { NgModule } from '@angular/core';
import { FieldErrorDisplayComponent } from './field-error-display.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { SharedTranslate } from '../../shared-translate.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SharedTranslate
  ],
  declarations: [
    FieldErrorDisplayComponent
  ],
  providers: [
  ],
  exports: [
    FieldErrorDisplayComponent
  ]
})
export class FieldErrorDisplayModule {}
