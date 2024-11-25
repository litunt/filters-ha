import {Component} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {CommonModule, NgIf, NgTemplateOutlet} from "@angular/common";
import {Button} from "primeng/button";
import {TranslateModule} from "@ngx-translate/core";
import {DataDisplayComponent} from "../data-display.component";

@Component({
  selector: 'modal-dialog',
  standalone: true,
  imports: [
    DialogModule,
    NgTemplateOutlet,
    CommonModule,
    Button,
    NgIf,
    TranslateModule
  ],
  templateUrl: './modal-dialog.component.html'
})
export class ModalDialogComponent extends DataDisplayComponent {
}
