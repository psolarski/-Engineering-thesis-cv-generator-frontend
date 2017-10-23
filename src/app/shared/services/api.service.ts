import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import'rxjs/add/operator/share';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

import { JwtService } from './jwt.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private jwtService: JwtService
  ) {}

  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (this.jwtService.getToken()) {
      headersConfig['Authorization'] = this.jwtService.getToken();
    }
    return new HttpHeaders(headersConfig);
  };

  put(path: string, body: Object): Observable<any> {
    return this.httpClient.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders(), observe: 'response' }
    )
  }

  login(credentials: Object): Observable<any> {
    let url = `${environment.api_url}` + 'login';

    return this.httpClient.post(url, JSON.stringify(credentials), { headers: this.setHeaders(), observe: 'response' });
  }

  get<T>(path: string): Observable<any>{
    let url = environment.api_url + path;

    return this.httpClient.get<T>(url, {headers: this.setHeaders(), observe: 'response' })
  }
}
