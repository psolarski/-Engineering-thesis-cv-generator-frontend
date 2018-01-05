import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { Education } from '../models/education.model';
import { Project } from '../models/project.model';

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
    this.apiService.post('developers/developer/', newDeveloper).subscribe();
  }

  addEducation(education: Education, username: string) {
    this.apiService.post('developers/developer/' + username + '/educations/education/', education).subscribe();
  }

  generatePdf(username: string): Observable<any> {
    // this.apiService.receivePdf('developers/developer/' + username + '/cv')
    return this.apiService.getDeveloperPdf('developers/developer/' + username + '/cv')
  }

  addProject(newProject: Project, developerUsername: string) {
    this.apiService.post('developers/developer/' + developerUsername + '/projects/project/', newProject).subscribe();
  }

  addSkills(skills: any, developerUsername: string) {
    this.apiService.post('developers/developer/' + developerUsername + '/skills/', skills).subscribe();
  }
}
