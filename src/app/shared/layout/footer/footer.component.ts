import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: `layout-footer`,
  templateUrl: `./footer.component.html`,
  styleUrls: [`./footer.component.css`]
})
export class FooterComponent {

  currentDate: number = Date.now();

  constructor(
    private translate: TranslateService) {}

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
