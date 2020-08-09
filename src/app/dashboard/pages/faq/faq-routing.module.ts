import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FaqComponent } from "./faq.component";
import { FaqListComponent } from "./components/faq-list/faq-list.component";
import { FaqAdderComponent } from "./components/faq-adder/faq-adder.component";
import { FaqEditorComponent } from "./components/faq-editor/faq-editor.component";

const routes: Routes = [
  {
    path: "",
    component: FaqComponent,
    children: [
      {
        path: "",
        component: FaqListComponent,
      },
      {
        path: "new-faq",
        component: FaqAdderComponent,
      },
      {
        path: "edit-faq/:slug",
        component: FaqEditorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaqRoutingModule {}
