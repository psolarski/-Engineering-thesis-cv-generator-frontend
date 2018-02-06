import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { JwtService } from './shared/services/jwt.service';
import { OutlookService } from './shared/services/outlook.service';
import { EmployeeService } from './shared/services/employee.service';
import { ApiService } from './shared/services/api.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GeneratorInterceptor } from './shared/interceptors/generator.interceptor';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './employees/profile/profile.module';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { EmployeesListModule } from './employees/employees-list/employees-list.module';
import { SkillsListModule } from './developers/skills/skills-list.module';
import { DeveloperService } from './shared/services/developer.service';
import { EducationModule } from './developers/education/education.module';
import { CreateEmployeeModule } from './employees/create-employee/create-employee.module';
import { HeaderModule } from './shared/layout/header/header.module';
import { DirectiveModule } from './shared/directives/directive.module';
import { ChangePasswordModule } from './employees/change-password/change-password.module';
import { FieldErrorDisplayModule } from './shared/validations/error/field-error-display.module';
import { CreateEducationModule } from './developers/create-education/create-education.module';
import { CvGenerationModule } from './developers/cv-generation/cv-generation.module';
import { HttpModule } from '@angular/http';
import { CreateProjectModule } from './developers/create-project/create-project.module';
import { DeveloperSharedModule } from './developers/shared/developer.shared.module';
import { CreateSkillModule } from './developers/create-skill/create-skill.module';
import { OutlookModule } from './employees/outlook/outlook.module';
import { ProjectModule } from './developers/projects/project.module';
import { EditEmployeeModule } from './employees/edit-employee/edit-employee.module';
import { SharedTranslate } from './shared/shared-translate.module';


const rootRouting: ModuleWithProviders = RouterModule.forRoot([
  // {
  //   // path: '',
  //   // component: AppComponent,
  //   // data: {}
  // }
], { useHash: false });



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthModule,
    rootRouting,
    HttpClientModule,
    ProfileModule,
    EmployeesListModule,
    SkillsListModule,
    EducationModule,
    CreateEmployeeModule,
    HeaderModule,
    DirectiveModule,
    ChangePasswordModule,
    FieldErrorDisplayModule,
    CreateEducationModule,
    CvGenerationModule,
    HttpModule,
    CreateProjectModule,
    DeveloperSharedModule,
    CreateSkillModule,
    OutlookModule,
    ProjectModule,
    EditEmployeeModule,
    SharedTranslate
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: GeneratorInterceptor,
      multi: true
    },
    JwtService,
    EmployeeService,
    ApiService,
    DeveloperService,
    HeaderModule,
    FieldErrorDisplayModule,
    DeveloperSharedModule,
    OutlookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
