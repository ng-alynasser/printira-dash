import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RolesRoutingModule } from "./roles-routing.module";
import { RolesComponent } from "./roles.component";
import { RolesListComponent } from "./components/roles-list/roles-list.component";
import { RolesEditorComponent } from "./components/roles-editor/roles-editor.component";
import { SharedModule } from "src/app/shared/shared.module";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material";

@NgModule({
  declarations: [RolesComponent, RolesListComponent, RolesEditorComponent],
  imports: [
    SharedModule,
    RolesRoutingModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
  ],
})
export class RolesModule {}
