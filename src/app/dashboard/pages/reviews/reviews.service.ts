import { Injectable } from "@angular/core";
import {
  DeleteReviewGQL,
  PaginatorInput,
  ReviewsGQL,
  FilterReviewInput,
} from "src/app/common/generated-types";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class ReviewsService {
  constructor(
    private readonly reviewsGQL: ReviewsGQL,
    private readonly deleteReviewGQL: DeleteReviewGQL
  ) { }

  getAll(paginate?: PaginatorInput, filter?: FilterReviewInput, sort?: string) {
    return this.reviewsGQL
      .watch({ paginate, filter, sort })
      .valueChanges.pipe(map((response) => response.data.reviews_board.data));
  }

  deleteReview(reviewId: string) {
    return this.deleteReviewGQL
      .mutate({
        reviewId,
      })
      .pipe(map((response) => response.data.deleteReview));
  }
}
