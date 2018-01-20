import { Component, OnInit } from '@angular/core';
import { Developer } from '../../shared/models/developer.model';
import { DeveloperService } from '../../shared/services/developer.service';

@Component({
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css',
              '../shared/developers.shared.css']
})
export class ProjectComponent implements OnInit {

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
}
