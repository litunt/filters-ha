import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClient, provideHttpClient} from "@angular/common/http";
import {ToastModule} from "primeng/toast";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {LoaderComponent} from "./_components/loader/loader.component";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    ToastModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ProgressSpinnerModule
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(translate: TranslateService) {
    translate.use(translate.getDefaultLang());
  }
}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
