import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OptionsRoutingModule } from "./options-routing.module";
import { OptionsComponent } from "./options.component";
import { OptionAdderComponent } from "./components/option-adder/option-adder.component";
import { OptionEditorComponent } from "./components/option-editor/option-editor.component";
import { OptionsListComponent } from "./components/options-list/options-list.component";
import { SharedModule } from "src/app/shared/shared.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatIconModule } from "@angular/material";

@NgModule({
  declarations: [
    OptionsComponent,
    OptionAdderComponent,
    OptionEditorComponent,
    OptionsListComponent,
  ],
  imports: [
    SharedModule,
    OptionsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatIconModule,
  ],
})
export class OptionsModule {}
