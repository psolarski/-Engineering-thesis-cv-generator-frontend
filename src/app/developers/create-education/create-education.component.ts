import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DeveloperService } from '../../shared/services/developer.service';
import {Location} from '@angular/common';
import { Education } from '../../shared/models/education.model';


@Component({
  selector: "create-education",
  templateUrl: './create-education.component.html',
  styleUrls: ['./create-education.component.css']
})
export class CreateEducationComponent implements OnInit {

  educationForm: FormGroup;
  newEducation: Education;
  isSubmitting: boolean;
  developerUsername: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private developerService: DeveloperService
  ) {
    this.newEducation = new Education();
    this.isSubmitting = false;
  }

  submitForm() {
    this.isSubmitting = true;
    if (this.educationForm.valid) {
      console.log(this.newEducation);
      this.developerService.addEducation(this.newEducation, this.developerUsername);
      this.router.navigate(["/profile/" + this.developerUsername]);
    } else {
      this.validateAllFormFields(this.educationForm);
      this.isSubmitting = false;
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.developerUsername = params['username'];
    });
    this.createForm();
  }

  isFieldValid(field: string) {
    return (
      (!this.educationForm.get(field).valid && this.educationForm.get(field).touched) ||
      (this.educationForm.get(field).untouched && this.isSubmitting)
    );
  }

  clearForm() {
    this.educationForm.reset();
    this.isSubmitting = false;
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  goBackClicked() : void {
    this.location.back();
  }


  private createForm(): void {
    this.educationForm = this.formBuilder.group({
      'university': [ '',
        [ Validators.required,
          Validators.minLength(2),
          Validators.maxLength(80) ]
      ],
      'faculty': [ '',
        [ Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100) ]
      ],
      'specialization': [ '',
        [ Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100) ]
      ],
      'startDate': [ '',
        [ Validators.required ]
      ],
      'endDate': [ '',
        [ Validators.required ]
      ]
    })
  }
}
