import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { OptionsComponent } from "./options.component";
import { OptionsListComponent } from "./components/options-list/options-list.component";
import { OptionAdderComponent } from "./components/option-adder/option-adder.component";
import { OptionEditorComponent } from "./components/option-editor/option-editor.component";

const routes: Routes = [
  {
    path: "",
    component: OptionsComponent,
    children: [
      { path: "", component: OptionsListComponent },
      { path: "new-option", component: OptionAdderComponent },
      { path: "edit-option/:slug", component: OptionEditorComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OptionsRoutingModule {}
