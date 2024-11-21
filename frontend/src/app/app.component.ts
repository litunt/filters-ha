import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LoaderService} from "./_services/loader/loader.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Filters App UI';

  constructor(private loaderService: LoaderService,
              private translate: TranslateService) {
    translate.addLangs(['en']);
    translate.setDefaultLang('en');
  }

  get isLoading() {
    return this.loaderService.isLoading;
  }
}
