import { Routes, RouterModule } from "@angular/router";
import { UsersComponent } from "./users.component";
import { UsersListComponent } from "./components/users-list/users-list.component";
import { UsersAdderComponent } from "./components/users-adder/users-adder.component";
import { UsersEditorComponent } from "./components/users-editor/users-editor.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: "",
    component: UsersComponent,
    children: [
      {
        path: "",
        component: UsersListComponent,
      },
      {
        path: "new-user",
        component: UsersAdderComponent,
      },
      {
        path: "edit-user/:slug",
        component: UsersEditorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
