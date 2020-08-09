import { NgModule } from "@angular/core";

import { VendorsRoutingModule } from "./vendors-routing.module";
import { VendorsComponent } from "./vendors.component";
import { VendorsAdderComponent } from "./components/vendors-adder/vendors-adder.component";
import { VendorsListComponent } from "./components/vendors-list/vendors-list.component";
import { VendorsEditorComponent } from "./components/vendors-editor/vendors-editor.component";
import { SharedModule } from "src/app/shared/shared.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule, MatCheckboxModule } from "@angular/material";
import { MatDatepickerModule } from "@angular/material/datepicker";

@NgModule({
  declarations: [
    VendorsComponent,
    VendorsAdderComponent,
    VendorsListComponent,
    VendorsEditorComponent,
  ],
  imports: [
    SharedModule,
    VendorsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatCheckboxModule,
  ],
})
export class VendorsModule {}
