import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ArticlesComponent } from "./articles.component";
import { ArticlesListComponent } from "./components/articles-list/articles-list.component";
import { ArticleAdderComponent } from "./components/article-adder/article-adder.component";
import { ArticleEditorComponent } from "./components/article-editor/article-editor.component";

const routes: Routes = [
  {
    path: "",
    component: ArticlesComponent,
    children: [
      {
        path: "",
        component: ArticlesListComponent,
      },
      {
        path: "new-article",
        component: ArticleAdderComponent,
      },
      {
        path: "edit-article/:slug",
        component: ArticleEditorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesRoutingModule {}
