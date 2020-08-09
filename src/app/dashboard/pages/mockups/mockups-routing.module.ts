import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MockupsComponent } from "./mockups.component";
import { MockupsListComponent } from "./components/mockups-list/mockups-list.component";
import { MockupAdderComponent } from "./components/mockup-adder/mockup-adder.component";
import { MockupEditorComponent } from "./components/mockup-editor/mockup-editor.component";

const routes: Routes = [
  {
    path: "",
    component: MockupsComponent,
    children: [
      {
        path: "",
        component: MockupsListComponent,
      },
      {
        path: "new-mockup",
        component: MockupAdderComponent,
      },
      {
        path: "edit-mockup/:slug",
        component: MockupEditorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MockupsRoutingModule {}
