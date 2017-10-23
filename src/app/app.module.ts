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
import { ProfileModule } from './profile/profile.module';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthModule,
    rootRouting,
    HttpClientModule,
    ProfileModule
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: GeneratorInterceptor,
      multi: true
    },
    JwtService,
    EmployeeService,
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
