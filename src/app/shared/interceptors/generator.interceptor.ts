import {Injectable} from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/observable/throw';

@Injectable()
export class GeneratorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .catch(err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401 && this.router.url !== '/login') {
          console.log("Unauthorized: " + err.message);
          return this.router.navigate(['/login']);
        } if (err.status === 403) {
          console.log("Forbidden: " + err.message);
          return this.router.navigate(['/error/403']);
        } if (err.status === 404) {
          console.log("Not found: " + err.message);
          return this.router.navigate(['/error/404']);
        }
      }
      return Observable.throw(Error(err.error));
    }) as any;
  }
}
