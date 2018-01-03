import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { DeveloperService } from '../../shared/services/developer.service';
import { Project } from '../../shared/models/project.model';
import { Component } from '@angular/core';

@Component({
  selector: 'create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {

  projectForm: FormGroup;
  isSubmitting: boolean;
  developerUsername: string;
  newProject: Project;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private developerService: DeveloperService
  ) {
    this.newProject = new Project();
    this.isSubmitting = false;
  }

  submitForm() {
    this.isSubmitting = true;
    if (this.projectForm.valid) {
      console.log(this.newProject);
      this.developerService.addProject(this.newProject, this.developerUsername);
      this.router.navigate(["/profile/" + this.developerUsername]);
    } else {
      this.validateAllFormFields(this.projectForm);
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
      (!this.projectForm.get(field).valid && this.projectForm.get(field).touched) ||
      (this.projectForm.get(field).untouched && this.isSubmitting)
    );
  }

  clearForm() {
    this.projectForm.reset();
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
    this.projectForm = this.formBuilder.group({
      'description': [ '',
        [ Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100) ]
      ],
      'position': [ '',
        [ Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100) ]
      ],
      'city': [ '',
        [ Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100) ]
      ],
      'company': [ '',
        [ Validators.required,
          Validators.minLength(3),
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
