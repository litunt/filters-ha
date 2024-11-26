import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {ToastModule} from "primeng/toast";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {LoaderComponent} from "./_components/loader/loader.component";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {FooterComponent} from "./_components/footer/footer.component";
import {DividerModule} from "primeng/divider";
import {AppRoutingModule} from "./app-routing.module";
import {MessageService} from "primeng/api";
import {InputSwitchModule} from "primeng/inputswitch";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PaginatorModule} from "primeng/paginator";
import {ChipsModule} from "primeng/chips";
import {CalendarModule} from "primeng/calendar";
import {ButtonModule} from "primeng/button";
import {AppErrorService} from "./_services/interceptor/app-error.service";
import {AppHttpInterceptor} from "./_services/interceptor/app.http.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ProgressSpinnerModule,
    DividerModule,
    InputSwitchModule,
    DropdownModule,
    FormsModule,
    PaginatorModule,
    ReactiveFormsModule,
    ChipsModule,
    CalendarModule,
    ButtonModule
  ],
  providers: [
    MessageService,
    AppErrorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },
    provideHttpClient(withInterceptorsFromDi()),
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
