import { RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AuthGuard } from '../../shared/guards/auth-guard.service';
import { CvGenerationComponent } from './cv-generation.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';


const cvGenerationRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: "profile/:username/cv-generation",
    component: CvGenerationComponent,
    canActivate: [AuthGuard]
  }
]);
@NgModule({
  imports: [
    cvGenerationRouting,
    SharedModule,
    PdfViewerModule
  ],
  declarations: [
    CvGenerationComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class CvGenerationModule {}
