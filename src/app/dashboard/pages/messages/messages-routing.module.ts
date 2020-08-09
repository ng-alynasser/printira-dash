import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MessagesComponent } from "./messages.component";
import { MessagesListComponent } from "./components/messages-list/messages-list.component";
import { MessageViewComponent } from "./components/message-view/message-view.component";

const routes: Routes = [
  {
    path: "",
    component: MessagesComponent,
    children: [
      {
        path: "",
        component: MessagesListComponent,
      },
      {
        path: ":slug",
        component: MessageViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesRoutingModule {}
