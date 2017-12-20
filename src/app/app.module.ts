import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { JwtService } from './shared/services/jwt.service';
import { EmployeeService } from './shared/services/employee.service';
import { ApiService } from './shared/services/api.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GeneratorInterceptor } from './shared/interceptors/generator.interceptor';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './employees/profile/profile.module';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { ShowAuthenticatedDirective } from './shared/directives/show-authenticated.directive';
import { EmployeesListModule } from './employees/employees-list/employees-list.module';
import { SkillsListModule } from './developers/skills/skills-list.module';
import { DeveloperService } from './shared/services/developer.service';
import { EducationModule } from './developers/education/education.module';
import { CreateEmployeeModule } from './employees/create-employee/create-employee.module';
// import { NotificationModule } from './developers/notifications/notification.module';
import { HeaderComponent } from './shared/layout/header/header.component';
import { NotificationComponent } from './developers/notifications/notification.component';
import { NotificationModule } from './developers/notifications/notification.module';
import { HeaderModule } from './shared/layout/header/header.module';
import { DirectiveModule } from './shared/directives/directive.module';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([
  // {
  //   path: ``,
  //   component: AppComponent,
  //   canActivate: [AuthGuard]
  // }
], { useHash: true });

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
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
    DirectiveModule
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
    HeaderModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
