import { Injectable } from '@angular/core';

const tokenName = `jwtToken`;

@Injectable()
export class JwtService {

  getToken(): String {
    return window.localStorage[tokenName];
  }

  saveToken(token: String) {
    console.log(`Saved token`);
    window.localStorage[tokenName] = token;
  }

  destroyToken() {
    window.localStorage.removeItem(tokenName);
  }
}
