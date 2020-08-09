import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ArtsRoutingModule } from "./arts-routing.module";
import { ArtsComponent } from "./arts.component";
import { ArtAdderComponent } from "./components/art-adder/art-adder.component";
import { ArtsListComponent } from "./components/arts-list/arts-list.component";
import { ArtEditorComponent } from "./components/art-editor/art-editor.component";
import { SharedModule } from "src/app/shared/shared.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatChipsModule } from "@angular/material/chips";
@NgModule({
  declarations: [
    ArtsComponent,
    ArtAdderComponent,
    ArtsListComponent,
    ArtEditorComponent,
  ],
  imports: [
    SharedModule,
    ArtsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatIconModule,
    MatChipsModule,
  ],
})
export class ArtsModule {}
