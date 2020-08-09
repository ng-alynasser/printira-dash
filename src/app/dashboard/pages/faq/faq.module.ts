import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FaqRoutingModule } from "./faq-routing.module";
import { FaqComponent } from "./faq.component";
import { FaqListComponent } from "./components/faq-list/faq-list.component";
import { FaqAdderComponent } from "./components/faq-adder/faq-adder.component";
import { FaqEditorComponent } from "./components/faq-editor/faq-editor.component";
import { SharedModule } from "src/app/shared/shared.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { CKEditorModule } from "ng2-ckeditor";
import { MatIconModule } from "@angular/material";

@NgModule({
  declarations: [
    FaqComponent,
    FaqListComponent,
    FaqAdderComponent,
    FaqEditorComponent,
  ],
  imports: [
    SharedModule,
    FaqRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    CKEditorModule,
    MatIconModule,
  ],
})
export class FaqModule {}
