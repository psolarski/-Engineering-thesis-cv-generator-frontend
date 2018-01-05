import { Component, OnInit } from '@angular/core';
import { Skill } from '../../shared/models/skill.model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeveloperService } from '../../shared/services/developer.service';
import { Location } from '@angular/common';

@Component({
  selector: 'create-skill',
  templateUrl: './create-skill.component.html',
  styleUrls: ['./create-skill.component.css']
})
export class CreateSkillComponent implements OnInit {

  skillsForm: FormGroup;
  isSubmitting: boolean;
  developerUsername: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private developerService: DeveloperService
  ) {
    this.isSubmitting = false;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.developerUsername = params['username'];
    });

    this.skillsForm = this.formBuilder.group({
      skills: this.formBuilder.array([this.createSkill()])
    });
  }

  private createSkill(): FormGroup {
    return this.formBuilder.group({
      'name': [ '',
        [ Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40) ]
      ],
      'level': [ '',
        [ Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40) ]
      ]
    });
  }

  addNewRow() {
    const control = <FormArray>this.skillsForm.controls['skills'];
    control.push(this.createSkill());
  }

  deleteRow(index: number) {
    const control = <FormArray>this.skillsForm.controls['skills'];
    control.removeAt(index);
  }

  goBackClicked() {
    this.location.back();
  }

  submitForm() {
    this.isSubmitting = true;
    if (this.skillsForm.valid) {
      this.developerService.addSkills(this.skillsForm.controls['skills'].value, this.developerUsername);
      this.router.navigate(["/profile/" + this.developerUsername]);
    } else {
      console.log("Invalid form!");
      this.markFormGroupTouched(this.skillsForm);
      this.isSubmitting = false;
    }
  }

  clearForm() {
    this.skillsForm.reset();
    this.isSubmitting = false;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }
}
