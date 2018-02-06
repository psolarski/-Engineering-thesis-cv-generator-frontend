import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';

const outlookTokenName = 'outlookToken';

@Injectable()
export class OutlookService {

  nonce: string;
  attachments = [
    {Name: String, ContentBytes: ArrayBuffer}
  ];

  map: Map<string, Blob> = new Map();

  constructor(
    private apiService: ApiService
  ) {}

  getToken(): String {
    return window.localStorage[outlookTokenName];
  }

  saveToken(token: String) {
    console.log(token);
    window.localStorage[outlookTokenName] = token;
  }

  destroyToken() {
    window.localStorage.removeItem(outlookTokenName);
  }

  buildAuthUrl() {

    this.nonce = Math.random().toString().substring(2, 12);
    return 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?' + 'response_type=id_token+token'
      + '&client_id=b10936d8-f54e-45e2-86a1-9a1a41b23203' + '&scope=openid+User.Read+Mail.Read+Mail.Send'
      + '&redirect_uri=http://localhost:4200/'
      + '&nonce=' + this.nonce
      + '&response_mode=fragment';
  }


  getAllMessages(): Observable<any> {
    return this.apiService.getForOutlook("outlook/mails", this.getToken());
  }

  sendMail(mailForm) {
    return this.apiService.postForOutlook("outlook/mail", this.getToken(), mailForm).subscribe();
  }

  addMailAttachments(fileName: String, blob: Blob) {

    let reader = new FileReader();
    let arrayBuffer;

    reader.onload = function() {
      arrayBuffer = reader.result;
    };
    arrayBuffer = reader.readAsArrayBuffer(blob);

    console.log(fileName);

    setTimeout(() => {
      alert(arrayBuffer);
      // this.attachments.push({Name: fileName, ContentBytes: arrayBuffer});
      this.map.set(fileName.toString(), arrayBuffer);
    }, 5000)
  }

  getAllMailAttachments(): Map<string, Blob> {
    return this.map;
  }

  getMapAttachments() {

  }
}
