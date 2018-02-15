import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeveloperService } from '../../shared/services/developer.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {Location} from '@angular/common';
import { saveAs } from 'file-saver/FileSaver';
import { OutlookService } from '../../shared/services/outlook.service';

@Component({
  templateUrl: './cv-generation.component.html',
  styleUrls: ['cv-generation.component.css']
})
export class CvGenerationComponent implements OnInit {

  developerUsername: string;
  pdfFileUrl: SafeResourceUrl;
  pdfFile: SafeResourceUrl;
  pdf: Blob;
  isOutlookTokenAvailable: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private developerService: DeveloperService,
    private location: Location,
    private sanitizer: DomSanitizer,
    private outlookService: OutlookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.developerUsername = params['username'];
    });

    this.developerService.generatePdf(this.developerUsername)
      .subscribe(response => {

        let file = new Blob([ response.blob() ], { type: 'application/pdf' });
        let url = URL.createObjectURL(file);
        this.pdf = file;
        this.pdfFile = file;
        this.pdfFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
    this.isOutlookTokenAvailable = !!this.outlookService.getToken();
  }

  addAttachment(): void {
    this.outlookService.addMailAttachments(this.developerUsername + "CV", this.pdf);
  }

  goBackClicked() : void {
    this.location.back();
  }

  saveGeneratedCv(): void {
    saveAs(this.pdfFile, this.developerUsername);
  }
}
