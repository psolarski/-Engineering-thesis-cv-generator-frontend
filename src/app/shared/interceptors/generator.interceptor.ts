import {Injectable} from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class GeneratorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log(req);
    return next.handle(req)
      .catch(err => {
      console.log("Something went wrong");
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          console.log(err.message);
          return this.router.navigate(['/login']);
        } else {
          console.log(err.message);
          //TODO
          // return this.router.navigate(['/error']);
        }
      }
    });
  }
}
