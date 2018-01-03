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

  put(path: string, body: Object) {
    let url = environment.api_url + path;

    console.log(url);
    console.log(JSON.stringify(body));
    return this.httpClient.put(
      url,
      JSON.stringify(body),
      { headers: this.setHeaders(), observe: 'response' }
    ).subscribe();
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

    return this.httpClient.post<Object>(url,
                                        JSON.stringify(object),
                                    { headers: this.setHeaders(), observe: 'response' })
  }

  receivePdf(path: string) {
    console.log("PPPPPPPPPPDDDDDDDDDDDDDDDDDDDDDDDDFFFFFFFFFFFFFFFFFF");
    let url = environment.api_url + path;

    let headerJson = {
      'Accept': 'application/pdf',
      'Authorization': this.jwtService.getToken().toString(),
      responseType: 'ArrayBuffer'
    };
    let headers = new HttpHeaders(headerJson);

    this.httpClient.get(url, { headers, observe: 'response' })
      .subscribe(data => {
        console.log("BOOOOOOOOODDDDDDDDDDDDDDDDYYYYYYYYYYYYY");
        // console.log("BODY: " + data.body);
      })
    // .map(data => {
    //   console.log("BOOOOOOOOODDDDDDDDDDDDDDDDYYYYYYYYYYYYY");
    //   console.log("BODY: " + data.body);
    //   let file = new Blob([data.body], {type: 'application/pdf'});
    //   console.log(file);
    //
    //   return URL.createObjectURL(file);
  // })
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


  // return this.httpClient.get(url, { headers }).map(
  //   (data:any) => { // data type is Response, but since _body is private field i changed it to any
  //
  //     let file3 = new Blob([data._body], {type: 'application/pdf'});
  //     return this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file3));
  //   },
  //   error => {
  //     console.log(error);
  //   })

  // public getConsultationDocumentPDF (pHash:string):Observable<Response> {
  //   return this.httpClient.get(
  //     "https://***********.idshost.fr/ws/********xfer/ws/download/"+pHash,
  //     {
  //       headers: new HttpHeaders({
  //         "Access-Control-Allow-Origin": "*",
  //         "Authorization": "Bearer "
  //       }),
  //       responseType: ResponseContentType.ArrayBuffer // YOU NEED THAT
  //     }
  //   );
}
