import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MockupsRoutingModule } from "./mockups-routing.module";
import { MockupsComponent } from "./mockups.component";
import { MockupsListComponent } from "./components/mockups-list/mockups-list.component";
import { MockupAdderComponent } from "./components/mockup-adder/mockup-adder.component";
import { MockupEditorComponent } from "./components/mockup-editor/mockup-editor.component";
import { SharedModule } from "src/app/shared/shared.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [
    MockupsComponent,
    MockupsListComponent,
    MockupAdderComponent,
    MockupEditorComponent,
  ],
  imports: [
    SharedModule,
    MockupsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
  ],
})
export class MockupsModule {}
