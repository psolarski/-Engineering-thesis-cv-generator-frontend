import { Component, OnInit } from '@angular/core';
import { DeveloperService } from '../../shared/services/developer.service';
import { Developer } from '../../shared/models/developer.model';

@Component({
  selector: 'skills-list',
  templateUrl: './skills-list.component.html',
  styleUrls: [
    './skills-list.component.css',
    '../shared/developers.shared.css'
  ]
})
export class SkillsListComponent implements OnInit {

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
    console.log("Getting developers list");
    this.developerService.getDevelopers()
      .subscribe(developers => {
        this.developers = developers.body.list;
      });
  }
}
