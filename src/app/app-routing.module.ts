import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardGuard } from "./auth/guards/dashboard.guard";
import { AuthGuard } from "./auth/guards/auth.guard";

const routes: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
    // canActivate: [DashboardGuard],
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
    canActivate: [AuthGuard],
  },
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "**",
    redirectTo: "dashboard",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      scrollPositionRestoration: "enabled",
      initialNavigation: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
