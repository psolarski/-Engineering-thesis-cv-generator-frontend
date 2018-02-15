import { Component, OnInit } from '@angular/core';
import { OutlookService } from '../../shared/services/outlook.service';
import { Message } from '../../shared/models/outlook/message.model';
import { EmployeeService } from '../../shared/services/employee.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './outlook.component.html',
  styleUrls: ['./outlook.component.css'],
  selector: 'outlook'
})
export class OutlookComponent implements OnInit {

  developerUsername: string;
  messages: Message[];
  send: boolean;
  mailAttachments : Map<String, ArrayBuffer>;
  mailKeys: IterableIterator<String>;
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
    this.mailAttachments = this.outlookService.getAllMailAttachments();
    this.mailKeys = this.mailAttachments.keys();
    this.createForm();

    for(let key of this.mailAttachments.keys()) {
      let i: number = 0;

      let arraybuffer = this.mailAttachments.get(key);

      let base64 = btoa(
        new Uint8Array(arraybuffer)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      this.mailForm.controls['Attachments'].get(i.toString()).setValue({
        '@odata.type': "#Microsoft.OutlookServices.FileAttachment", 'Name': key, 'ContentBytes': base64});
      this.createAttachments();
      i++;
    }
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
    if (this.mailForm.valid) {
      this.outlookService.sendMail(this.mailForm.value).subscribe(data => {
        this.send = true;
        setTimeout(function() {
          this.send = false;
          this.isSubmitting = false;
        }.bind(this), 4000);
      }, error => {

      });
    } else {
      console.log("Form is invalid!");
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
    control.push(this.createAttachments());
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
