import { NgModule } from "@angular/core";
import { CategoriesRoutingModule } from "./categories-routing.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { CategoriesListComponent } from "./components/categories-list/categories-list.component";
import { CategoriesAdderComponent } from "./components/categories-adder/categories-adder.component";
import { CategoriesEditorComponent } from "./components/categories-editor/categories-editor.component";
import { CategoriesPreviewComponent } from "./components/categories-preview/categories-preview.component";
import { CategoriesComponent } from "./categories.component";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { SharedModule } from "src/app/shared/shared.module";
import {
  MatIconModule,
  MatCheckboxModule,
  MatTabsModule,
} from "@angular/material";

@NgModule({
  imports: [
    SharedModule,
    CategoriesRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatIconModule,
    MatCheckboxModule,
    MatTabsModule,
  ],
  declarations: [
    CategoriesListComponent,
    CategoriesAdderComponent,
    CategoriesEditorComponent,
    CategoriesPreviewComponent,
    CategoriesComponent,
  ],
})
export class CategoriesModule {}
