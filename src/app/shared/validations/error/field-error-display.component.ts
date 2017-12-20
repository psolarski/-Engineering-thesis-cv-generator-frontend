import { Input, Component } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'field-error-display',
  templateUrl: './field-error-display.component.html',
  styleUrls: ['./field-error-display.component.css']
})
export class FieldErrorDisplayComponent {

  @Input() displayError: boolean;
  @Input() formControl: FormControl;
}
