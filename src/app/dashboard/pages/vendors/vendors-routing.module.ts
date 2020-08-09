import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { VendorsComponent } from "./vendors.component";
import { VendorsListComponent } from "./components/vendors-list/vendors-list.component";
import { VendorsAdderComponent } from "./components/vendors-adder/vendors-adder.component";
import { VendorsEditorComponent } from "./components/vendors-editor/vendors-editor.component";

const routes: Routes = [
  {
    path: "",
    component: VendorsComponent,
    children: [
      {
        path: "",
        component: VendorsListComponent,
      },
      {
        path: "new-vendor",
        component: VendorsAdderComponent,
      },
      {
        path: "edit-vendor/:slug",
        component: VendorsEditorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorsRoutingModule {}
