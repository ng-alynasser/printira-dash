import { NgModule } from "@angular/core";
import { UsersListComponent } from "./components/users-list/users-list.component";
import { UsersComponent } from "./users.component";
import { UsersAdderComponent } from "./components/users-adder/users-adder.component";
import { UsersEditorComponent } from "./components/users-editor/users-editor.component";
import { UsersRoutingModule } from "./users-routing.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { SharedModule } from "src/app/shared/shared.module";
import { MatIconModule } from "@angular/material/icon";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCheckboxModule } from "@angular/material";

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule,
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
  declarations: [
    UsersListComponent,
    UsersAdderComponent,
    UsersEditorComponent,
    UsersComponent,
  ],
})
export class UsersModule {}
