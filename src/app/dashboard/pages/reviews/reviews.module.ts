import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReviewsRoutingModule } from "./reviews-routing.module";
import { ReviewsComponent } from "./reviews.component";
import { ReviewsListComponent } from "./components/reviews-list/reviews-list.component";
import { ReviewViewComponent } from "./components/review-view/review-view.component";
import { SharedModule } from "src/app/shared/shared.module";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material";

@NgModule({
  declarations: [ReviewsComponent, ReviewsListComponent, ReviewViewComponent],
  imports: [
    SharedModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    ReviewsRoutingModule,
    MatIconModule,
  ],
})
export class ReviewsModule {}
