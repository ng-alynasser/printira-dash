import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RolesComponent } from "./roles.component";
import { RolesListComponent } from "./components/roles-list/roles-list.component";
import { RolesEditorComponent } from "./components/roles-editor/roles-editor.component";

const routes: Routes = [
  {
    path: "",
    component: RolesComponent,
    children: [
      {
        path: "",
        component: RolesListComponent,
      },
      {
        path: "edit-role/:slug",
        component: RolesEditorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule {}
