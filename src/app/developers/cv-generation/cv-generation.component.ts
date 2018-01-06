import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DeveloperService } from '../../shared/services/developer.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import {Location} from '@angular/common';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  templateUrl: './cv-generation.component.html',
  styleUrls: ['cv-generation.component.css']
})
export class CvGenerationComponent implements OnInit {

  developerUsername: string;
  pdfFileUrl: SafeResourceUrl;
  pdfFile: SafeResourceUrl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private developerService: DeveloperService,
    private location: Location,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.developerUsername = params['username'];
    });


    this.developerService.generatePdf(this.developerUsername)
      .subscribe(response => {

        console.log("DATA LOG " + response.blob());
        let file = new Blob([ response.blob() ], { type: 'application/pdf' });
        let url = URL.createObjectURL(file, this.developerUsername+"CV");

        this.pdfFile = file;
        this.pdfFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
  }

  goBackClicked() : void {
    this.location.back();
  }

  saveGeneratedCv(): void {
    // this.fileSaver.msSaveBlob(this.pdfFileUrl, this.developerUsername);
    saveAs(this.pdfFile, this.developerUsername);
  }
}
