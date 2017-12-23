import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { Developer } from '../models/developer.model';

@Injectable()
export class DeveloperService {

  constructor(
    private apiService: ApiService,
  ) {}

  getDevelopers(): Observable<any> {
    return this.apiService.get("developers");
  }


  getDeveloper(username: string): Observable<any> {
    return this.apiService.get("developers/developer/" + username);
  }

  createDeveloper(newDeveloper: Object) {
    this.apiService.post(newDeveloper, 'developers/developer/');
  }
}
