import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "users",
        loadChildren: () =>
          import("./pages/users/users.module").then((m) => m.UsersModule),
      },
      {
        path: "categories",
        loadChildren: () =>
          import("./pages/categories/categories.module").then(
            (m) => m.CategoriesModule
          ),
      },
      {
        path: "messages",
        loadChildren: () =>
          import("./pages/messages/messages.module").then(
            (m) => m.MessagesModule
          ),
      },
      {
        path: "reviews",
        loadChildren: () =>
          import("./pages/reviews/reviews.module").then((m) => m.ReviewsModule),
      },
      {
        path: "vendors",
        loadChildren: () =>
          import("./pages/vendors/vendors.module").then((m) => m.VendorsModule),
      },
      {
        path: "designers",
        loadChildren: () =>
          import("./pages/designers/designers.module").then(
            (m) => m.DesignersModule
          ),
      },
      {
        path: "products",
        loadChildren: () =>
          import("./pages/products/products.module").then(
            (m) => m.ProductsModule
          ),
      },
      {
        path: "arts",
        loadChildren: () =>
          import("./pages/arts/arts.module").then((m) => m.ArtsModule),
      },
      {
        path: "options",
        loadChildren: () =>
          import("./pages/options/options.module").then((m) => m.OptionsModule),
      },
      {
        path: "mockups",
        loadChildren: () =>
          import("./pages/mockups/mockups.module").then((m) => m.MockupsModule),
      },
      {
        path: "articles",
        loadChildren: () =>
          import("./pages/articles/articles.module").then(
            (m) => m.ArticlesModule
          ),
      },
      {
        path: "about-us",
        loadChildren: () =>
          import("./pages/about-us/about-us.module").then(
            (m) => m.AboutUsModule
          ),
      },
      {
        path: "faq",
        loadChildren: () =>
          import("./pages/faq/faq.module").then((m) => m.FaqModule),
      },
      {
        path: "terms",
        loadChildren: () =>
          import("./pages/terms/terms.module").then((m) => m.TermsModule),
      },
      {
        path: "roles",
        loadChildren: () =>
          import("./pages/roles/roles.module").then((m) => m.RolesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
