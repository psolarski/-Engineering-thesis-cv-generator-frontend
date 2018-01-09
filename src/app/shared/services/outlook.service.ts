import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';

const outlookTokenName = 'outlookToken';

@Injectable()
export class OutlookService {

  constructor(
    private apiService: ApiService,
  ) {}
  nonce: string;

  getToken(): String {
    return window.localStorage[outlookTokenName];
  }

  saveToken(token: String) {
    console.log(`Saved token`);
    window.localStorage[outlookTokenName] = token;
  }

  destroyToken() {
    window.localStorage.removeItem(outlookTokenName);
  }

  buildAuthUrl() {

    this.nonce = Math.random().toString().substring(2, 12);
    console.log(this.nonce);
    return 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?' + 'response_type=id_token+token'
      + '&client_id=b10936d8-f54e-45e2-86a1-9a1a41b23203' + '&scope=openid+User.Read+Mail.Read+Mail.Send'
      + '&redirect_uri=http://localhost:4200/'
      + '&nonce=' + this.nonce
      + '&response_mode=fragment';
  }


  getAllMessages(username: string): Observable<any> {
    return this.apiService.getForOutlook("outlook/mails/" + username, this.getToken());
  }
}
