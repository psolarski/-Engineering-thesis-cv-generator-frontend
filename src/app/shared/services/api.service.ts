import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import'rxjs/add/operator/share';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

import { JwtService } from './jwt.service';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { Http, ResponseContentType, Headers} from '@angular/http';
import { Employee } from '../models/employee.model';
import { EditEmployeeDto } from '../models/dto/edit-employee.dto';

@Injectable()
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private jwtService: JwtService,
    private sanitizer: DomSanitizer,
    private oldHttpClient: Http
  ) {}

  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (this.jwtService.getToken()) {
      headersConfig['Authorization'] = this.jwtService.getToken();
    }
    return new HttpHeaders(headersConfig);
  };

  put(path: string, body: Object): Observable<any> {
    let url = environment.api_url + path;

    return this.httpClient.put(
      url,
      JSON.stringify(body),
      { headers: this.setHeaders(), observe: 'response' }
    );
  }

  putEmployee(path: string, body: Employee | EditEmployeeDto): Observable<any> {
    let url = environment.api_url + path;

    let httpHeader = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ETag': body.version.toString()
    };
    if (this.jwtService.getToken()) {
      httpHeader['Authorization'] = this.jwtService.getToken();
    }

    console.log(httpHeader);
    return this.httpClient.put(
      url,
      JSON.stringify(body),
      { headers: new HttpHeaders(httpHeader), observe: 'response' }
    );
  }

  putEmployeeChangePassword(path: string, body: Employee | EditEmployeeDto, password: object): Observable<any> {
    let url = environment.api_url + path;

    let httpHeader = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ETag': body.version.toString()
    };
    if (this.jwtService.getToken()) {
      httpHeader['Authorization'] = this.jwtService.getToken();
    }

    console.log(httpHeader);
    return this.httpClient.put(
      url,
      JSON.stringify(password),
      { headers: new HttpHeaders(httpHeader), observe: 'response' }
    );
  }

  login(credentials: Object): Observable<any> {
    let url = `${environment.api_url}` + 'login';

    return this.httpClient.post(url, JSON.stringify(credentials), { headers: this.setHeaders(), observe: 'response' });
  }

  get(path: string): Observable<any>{
    let url = environment.api_url + path;

    return this.httpClient.get(url, {headers: this.setHeaders(), observe: 'response'});
  }

  post(path: string, object: Object) {
    let url = `${environment.api_url}` + path;

    console.log("BODY : " + JSON.stringify(object));
    return this.httpClient.post<Object>(url,
                                        JSON.stringify(object),
                                    { headers: this.setHeaders(), observe: 'response' })
  }

  /* Old version http */
  getDeveloperPdf(path: string): Observable<any> {
    let url = environment.api_url + path;

    let headerJson = {
      'Authorization': this.jwtService.getToken().toString(),
      'Accept': 'application/pdf',
    };
    let headers = new Headers(headerJson);

    return this.oldHttpClient.get(url,
      { responseType: ResponseContentType.Blob, headers }
      )
  }

  getForOutlook(path: string, outlookToken: String): Observable<any>{
    let url = environment.api_url + path;

    return this.httpClient.get(url, {headers: this.setHeaders().append("auth_token", outlookToken.toString()), observe: 'response'});
  }

  postForOutlook(path: string, outlookToken: String, Message: any) {
    let url = environment.api_url + path;

    let body = {
      Message
    };
    return this.httpClient
      .post(url,
        JSON.stringify(body),
        {headers: this.setHeaders()
            .append("auth_token", outlookToken.toString())
          ,observe: 'response'});
  }
}
