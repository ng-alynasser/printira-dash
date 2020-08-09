import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ReviewsComponent } from "./reviews.component";
import { ReviewsListComponent } from "./components/reviews-list/reviews-list.component";
import { ReviewViewComponent } from "./components/review-view/review-view.component";

const routes: Routes = [
  {
    path: "",
    component: ReviewsComponent,
    children: [
      {
        path: "",
        component: ReviewsListComponent,
      },
      {
        path: ":slug",
        component: ReviewViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewsRoutingModule {}
