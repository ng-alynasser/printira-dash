import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AboutUsRoutingModule } from "./about-us-routing.module";
import { AboutUsComponent } from "./about-us.component";
import { SharedModule } from "src/app/shared/shared.module";
import { CKEditorModule } from "ng2-ckeditor";
import { MatIconModule } from "@angular/material";

@NgModule({
  declarations: [AboutUsComponent],
  imports: [SharedModule, AboutUsRoutingModule, CKEditorModule, MatIconModule],
})
export class AboutUsModule {}
