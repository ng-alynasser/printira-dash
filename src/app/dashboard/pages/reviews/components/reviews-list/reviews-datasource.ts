import { DataSource } from "@angular/cdk/table";
import {
  Review,
  PaginatorInput,
  FilterReviewInput,
} from "src/app/common/generated-types";
import { BehaviorSubject, Observable, of } from "rxjs";
import { ReviewsService } from "../../reviews.service";
import { CollectionViewer } from "@angular/cdk/collections";
import { tap, catchError } from "rxjs/operators";

export class ReviewsDataSource implements DataSource<Review> {
  private reviewsSubject = new BehaviorSubject([]);
  private totalCountSubject = new BehaviorSubject({});
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public totalCount$ = this.totalCountSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  constructor(private readonly reviewsService: ReviewsService) {}

  connect(collectionViewer: CollectionViewer): Observable<Review[]> {
    return this.reviewsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.reviewsSubject.complete();
    this.loadingSubject.complete();
    this.totalCountSubject.complete();
  }

  loadReviews(
    paginate?: PaginatorInput,
    filter?: FilterReviewInput,
    sort?: string
  ) {
    this.loadingSubject.next(true);
    this.reviewsService
      .getAll(paginate, filter, sort)
      .pipe(
        tap((response) => {
          this.loadingSubject.next(false);
          this.totalCountSubject.next(response.pageInfo.totalCount);
          this.reviewsSubject.next(response.reviews);
        }),
        catchError(() => of([]))
      )
      .subscribe();
  }
}
