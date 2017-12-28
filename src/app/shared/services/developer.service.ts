import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { Education } from '../models/education.model';

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

  addEducation(education: Education, username: string) {
    this.apiService.post(education, 'developers/developer/' + username + '/educations/education/')
  }
}
