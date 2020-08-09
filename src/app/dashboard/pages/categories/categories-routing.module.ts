import { Routes, RouterModule } from "@angular/router";
import { CategoriesComponent } from "./categories.component";
import { CategoriesListComponent } from "./components/categories-list/categories-list.component";
import { CategoriesAdderComponent } from "./components/categories-adder/categories-adder.component";
import { CategoriesEditorComponent } from "./components/categories-editor/categories-editor.component";
import { NgModule } from "@angular/core";
import { CategoriesPreviewComponent } from "./components/categories-preview/categories-preview.component";

const routes: Routes = [
  {
    path: "",
    component: CategoriesComponent,
    children: [
      {
        path: "",
        component: CategoriesListComponent,
      },
      {
        path: ":slug",
        component: CategoriesPreviewComponent,
      },
      {
        path: "new-category",
        component: CategoriesAdderComponent,
      },
      {
        path: "edit-category/:slug",
        component: CategoriesEditorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
