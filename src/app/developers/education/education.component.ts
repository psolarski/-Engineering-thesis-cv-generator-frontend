import { Component, OnInit } from '@angular/core';
import { Developer } from '../../shared/models/developer.model';
import { DeveloperService } from '../../shared/services/developer.service';

@Component({
  selector: 'education',
  templateUrl: './education.component.html',
  styleUrls: [
    './education.component.css',
    '../shared/developers.shared.css'
  ]
})
export class EducationComponent implements OnInit {

  developers: Developer[];
  queryString: string;
  elementsCount: number;

  constructor(
    private developerService: DeveloperService
  ) {
    this.elementsCount = 5;
    this.queryString = "";
  }

  ngOnInit(): void {
    this.developerService.getDevelopers()
      .subscribe(developers => {
        this.developers = developers.body.list;
      });
  }

  countEducations(): number {
    let returnLenght = 0;
    this.developers.forEach(dev => {
      returnLenght += dev.educations.length;
    });
    return returnLenght;
  }
}
