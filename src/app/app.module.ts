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
import { HeaderComponent } from "./shared/layout/header/header.component";
import { ShowAuthenticatedDirective } from './shared/directives/show-authenticated.directive';
import { EmployeesListModule } from './employees/employees-list/employees-list.module';

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
    FooterComponent,
    HeaderComponent,
    ShowAuthenticatedDirective
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthModule,
    rootRouting,
    HttpClientModule,
    ProfileModule,
    EmployeesListModule
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: GeneratorInterceptor,
      multi: true
    },
    ShowAuthenticatedDirective,
    JwtService,
    EmployeeService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
