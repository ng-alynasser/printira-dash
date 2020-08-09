import { NgModule } from "@angular/core";
import { MessagesRoutingModule } from "./messages-routing.module";
import { MessagesComponent } from "./messages.component";
import { MessagesListComponent } from "./components/messages-list/messages-list.component";
import { MessageViewComponent } from "./components/message-view/message-view.component";
import { SharedModule } from "src/app/shared/shared.module";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material";

@NgModule({
  declarations: [
    MessagesComponent,
    MessagesListComponent,
    MessageViewComponent,
  ],
  imports: [
    SharedModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MessagesRoutingModule,
    MatIconModule,
  ],
})
export class MessagesModule {}
