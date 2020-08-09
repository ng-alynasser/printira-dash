import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ArtsComponent } from "./arts.component";
import { ArtsListComponent } from "./components/arts-list/arts-list.component";
import { ArtAdderComponent } from "./components/art-adder/art-adder.component";
import { ArtEditorComponent } from "./components/art-editor/art-editor.component";

const routes: Routes = [
  {
    path: "",
    component: ArtsComponent,
    children: [
      { path: "", component: ArtsListComponent },
      {
        path: "new-art",
        component: ArtAdderComponent,
      },
      {
        path: "edit-art/:slug",
        component: ArtEditorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtsRoutingModule {}
