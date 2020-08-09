import { NgModule } from "@angular/core";
import { ArticlesRoutingModule } from "./articles-routing.module";
import { ArticlesComponent } from "./articles.component";
import { ArticlesListComponent } from "./components/articles-list/articles-list.component";
import { ArticleAdderComponent } from "./components/article-adder/article-adder.component";
import { ArticleEditorComponent } from "./components/article-editor/article-editor.component";
import { SharedModule } from "src/app/shared/shared.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { CKEditorModule } from "ng2-ckeditor";
import { MatIconModule } from "@angular/material";

@NgModule({
  declarations: [
    ArticlesComponent,
    ArticlesListComponent,
    ArticleAdderComponent,
    ArticleEditorComponent,
  ],
  imports: [
    SharedModule,
    ArticlesRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CKEditorModule,
    MatIconModule,
  ],
})
export class ArticlesModule {}
