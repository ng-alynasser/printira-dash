import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TermsRoutingModule } from "./terms-routing.module";
import { TermsComponent } from "./terms.component";
import { SharedModule } from "src/app/shared/shared.module";
import { CKEditorModule } from "ng2-ckeditor";
import { MatIconModule } from "@angular/material";

@NgModule({
  declarations: [TermsComponent],
  imports: [SharedModule, TermsRoutingModule, CKEditorModule, MatIconModule],
})
export class TermsModule {}
