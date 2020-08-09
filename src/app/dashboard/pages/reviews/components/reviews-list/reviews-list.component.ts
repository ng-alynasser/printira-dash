import {
  Component,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { ReviewsDataSource } from "./reviews-datasource";
import { MatPaginator, MatSort } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { ReviewsService } from "../../reviews.service";
import { tap, debounceTime, distinctUntilChanged } from "rxjs/operators";
import { merge, fromEvent } from "rxjs";

@AutoUnsubscribe()
@Component({
  templateUrl: "./reviews-list.component.html",
  styleUrls: ["./reviews-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ReviewsListComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = [
    "user",
    "product",
    "vendor",
    "type",
    "createdAt",
  ];

  dataSource: ReviewsDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("searchInput") searchInput: ElementRef;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly reviewsService: ReviewsService
  ) {}

  ngOnInit(): void {
    this.dataSource = new ReviewsDataSource(this.reviewsService);
    this.dataSource.loadReviews(
      {
        page: 1,
      },
      {
        searchKey: "",
      },
      "createdAt"
    );
  }

  loadReviewsPage(): void {
    this.dataSource.loadReviews(
      {
        page: this.paginator.pageIndex + 1,
      },
      {
        searchKey: this.searchInput.nativeElement.value,
      },
      this.sort.active
    );
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    fromEvent(this.searchInput.nativeElement, "keyup")
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadReviewsPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadReviewsPage()))
      .subscribe();
  }

  ngOnDestroy(): void {}
}
