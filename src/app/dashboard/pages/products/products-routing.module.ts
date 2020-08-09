import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProductsComponent } from "./products.component";
import { ProductEditorComponent } from "./components/product-editor/product-editor.component";
import { ProductAdderComponent } from "./components/product-adder/product-adder.component";
import { ProductsListComponent } from "./components/products-list/products-list.component";

const routes: Routes = [
  {
    path: "",
    component: ProductsComponent,
    children: [
      {
        path: "",
        component: ProductsListComponent,
      },
      {
        path: "new-product",
        component: ProductAdderComponent,
      },
      {
        path: "edit-product/:slug",
        component: ProductEditorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
