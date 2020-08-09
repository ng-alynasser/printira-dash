import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductsRoutingModule } from "./products-routing.module";
import { ProductsComponent } from "./products.component";
import { ProductsListComponent } from "./components/products-list/products-list.component";
import { ProductAdderComponent } from "./components/product-adder/product-adder.component";
import { ProductEditorComponent } from "./components/product-editor/product-editor.component";
import { SharedModule } from "src/app/shared/shared.module";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatSelectModule } from "@angular/material/select";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTableModule } from "@angular/material/table";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { NbCheckboxModule } from "@nebular/theme";

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    ProductAdderComponent,
    ProductEditorComponent,
  ],
  imports: [
    SharedModule,
    ProductsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    NbCheckboxModule,
  ],
})
export class ProductsModule {}
