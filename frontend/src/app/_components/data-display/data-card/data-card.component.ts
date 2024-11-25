import {Component} from '@angular/core';
import {Button} from "primeng/button";
import {CardModule} from "primeng/card";
import {NgIf, NgTemplateOutlet} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {TranslateModule} from "@ngx-translate/core";
import {DataDisplayComponent} from "../data-display.component";

@Component({
  selector: 'data-card',
  standalone: true,
  imports: [
    Button,
    CardModule,
    NgTemplateOutlet,
    PrimeTemplate,
    TranslateModule,
    NgIf
  ],
  templateUrl: './data-card.component.html',
  styleUrl: './data-card.component.css'
})
export class DataCardComponent extends DataDisplayComponent {

}
