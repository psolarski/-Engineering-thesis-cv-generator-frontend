import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OutlookService } from '../../shared/services/outlook.service';
import { Message } from '../../shared/models/outlook/message.model';
import { EmployeeService } from '../../shared/services/employee.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  templateUrl: './outlook.component.html',
  styleUrls: ['./outlook.component.css'],
  selector: 'outlook'
})
export class OutlookComponent implements OnInit {

  developerUsername: string;
  messages: Message[];
  send: boolean;

  mailForm: FormGroup;
  isSubmitting: boolean;

  constructor(private employeeService: EmployeeService,
              private outlookService: OutlookService,
              private formBuilder: FormBuilder) {

    this.send = false;
  }

  ngOnInit(): void {
    this.employeeService.currentEmployee.subscribe(data => {
      this.developerUsername = data.username;
      this.outlookService.getAllMessages().subscribe(data => {
        this.messages = data.body;
      });
    });

    this.createForm();
  }

  private createForm() {
    this.mailForm = this.formBuilder.group({
      'Subject': [ '',
        [ Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100) ]
      ],
      'Body': this.formBuilder.group({
        'ContentType': [ 'Text',
          [ Validators.required,
            Validators.minLength(4),
            Validators.maxLength(10) ]
        ],
        'Content': [ '',
          [ ]
        ]
      }),
       Attachments:  this.formBuilder.array([this.createAttachments()]),
       ToRecipients: this.formBuilder.array([this.createRecipient()])
      })
  }

  submitForm() {
    this.isSubmitting = true;
    console.log("SUBMITTTINGG");
    if (1==1) {
      console.log("FORM VALID");

      let mailAttachments = this.outlookService.getAllMailAttachments();
      // for (let i = 0; i< mailAttachments.; i++) {
      //   let attachment = mailAttachments.pop();
      //   this.outlookService.attachments.forEach(console.log);
        // console.log("Attachment " + i + " values: " + attachment.Name, attachment.ContentBytes);
        // this.mailForm.controls['Attachments'][i].setValue({Name: 'Marek', ContentTypeBytes: '21312'});
        // this.mailForm.controls['Attachments'].setValue({Name: 'Marek', ContentTypeBytes: '21312'});
        // this.mailForm.controls['Attachments'].get("ContentTypeBytes").setValue("123123");
        // this.addNewAttachment();
        // console.log(this.mailForm.controls['Attachments'].get("Name"));



      // const control = <FormArray>this.mailForm.controls['Attachments'];
      //   // control.at(i).get("Name").setValue(mailAttachments[i].Name);
      //   // control.at(i).get("ContentBytes").setValue(mailAttachments[i].ContentBytes);
      // console.log("FUCKING VALUES: " + mailAttachments.has("dev3.pdf"));
      // for(let key of mailAttachments.keys()) {
      //   let i = 0;
      //   console.log("NAME: " + control.at(i).get("Name").value);
      //   console.log("FILE NAME: " + key);
      //   control.at(i).get("Name").setValue(key);
      //   control.at(i).get("ContentBytes").setValue(mailAttachments.get(key));
      //   i++;
      // }
      // console.log(this.mailForm.value);
      this.outlookService.sendMail(this.mailForm.value);

      this.send = true;
      setTimeout(function() {
        this.send = false;
        this.isSubmitting = false;
        this.mailForm.reset();
      }.bind(this), 4000);
    } else {
      console.log("Damn form is invalid!");
      this.isSubmitting = false;
    }
  }

  isFieldValid(field: string) {
    return (
      (!this.mailForm.get(field).valid && this.mailForm.get(field).touched) ||
      (this.mailForm.get(field).untouched && this.isSubmitting)
    );
  }

  private createRecipient(): FormGroup {
    return this.formBuilder.group({
      EmailAddress: this.formBuilder.group({
        Address: [ '',
          [ Validators.required,
            Validators.email ]
        ]
      })
    });
  }

  private createAttachments(): FormGroup {
    return this.formBuilder.group({
      "@odata.type": [ "#Microsoft.OutlookServices.FileAttachment" ],
      "Name": ['', [Validators.required]],
      "ContentBytes": ['', [Validators.required]]
    });
  }

  addNewAttachment() {
    const control = <FormArray>this.mailForm.controls['Attachments'];
    control.push(this.createRecipient());
  }

  deleteAttachment(index: number) {
    const control = <FormArray>this.mailForm.controls['Attachments'];
    control.removeAt(index);
  }


  addNewRow() {
    const control = <FormArray>this.mailForm.controls['ToRecipients'];
    control.push(this.createRecipient());
  }

  deleteRow(index: number) {
    const control = <FormArray>this.mailForm.controls['ToRecipients'];
    control.removeAt(index);
  }

  clearForm() {
    this.mailForm.reset();
    this.isSubmitting = false;
  }
}
