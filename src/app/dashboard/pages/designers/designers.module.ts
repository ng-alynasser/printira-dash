import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DesignersRoutingModule } from "./designers-routing.module";
import { DesignersComponent } from "./designers.component";
import { SharedModule } from "src/app/shared/shared.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { DesignersListComponent } from "./components/designers-list/designers-list.component";
import { DesignerAdderComponent } from "./components/designer-adder/designer-adder.component";
import { DesignerEditorComponent } from "./components/designer-editor/designer-editor.component";
import {
  MatIconModule,
  MatDatepickerModule,
  MatCheckboxModule,
} from "@angular/material";

@NgModule({
  declarations: [
    DesignersComponent,
    DesignersListComponent,
    DesignerAdderComponent,
    DesignerEditorComponent,
  ],
  imports: [
    SharedModule,
    DesignersRoutingModule,
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
export class DesignersModule {}
