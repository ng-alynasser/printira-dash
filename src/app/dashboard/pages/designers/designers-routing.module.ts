import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DesignersComponent } from "./designers.component";
import { DesignersListComponent } from "./components/designers-list/designers-list.component";
import { DesignerAdderComponent } from "./components/designer-adder/designer-adder.component";
import { DesignerEditorComponent } from "./components/designer-editor/designer-editor.component";

const routes: Routes = [
  {
    path: "",
    component: DesignersComponent,
    children: [
      {
        path: "",
        component: DesignersListComponent,
      },
      {
        path: "new-designer",
        component: DesignerAdderComponent,
      },
      {
        path: "edit-designer/:slug",
        component: DesignerEditorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesignersRoutingModule {}
