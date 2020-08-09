import {
  Component,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { ArticlesDataSource } from "./articles-datasource";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Router, ActivatedRoute } from "@angular/router";
import { ArticlesService } from "../../articles.service";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { fromEvent, merge } from "rxjs";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { StaticValue } from "src/app/common/generated-types";

@AutoUnsubscribe()
@Component({
  templateUrl: "./articles-list.component.html",
  styleUrls: ["./articles-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ArticlesListComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = [
    "thumbnail",
    "titleAr",
    "titleEn",
    "activated",
    "createdAt",
    "actions",
  ];

  dataSource: ArticlesDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("searchInput") searchInput: ElementRef;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly articlesService: ArticlesService
  ) {}

  ngOnInit(): void {
    console.log("Started");
    this.dataSource = new ArticlesDataSource(this.articlesService);
    this.dataSource.loadArticles({ page: 1 }, { searchKey: "" }, "createdAt");
  }

  loadArticlesPage(): void {
    this.dataSource.loadArticles(
      {
        page: this.paginator.pageIndex + 1,
      },
      {
        searchKey: this.searchInput.nativeElement.value,
      },
      this.sort.active
    );
  }

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    fromEvent(this.searchInput.nativeElement, "keyup")
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadArticlesPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadArticlesPage()))
      .subscribe();
  }

  showEdit(row: StaticValue) {
    this.router.navigate(["edit-article", row.id], {
      relativeTo: this.route,
    });
  }

  newArticle() {
    this.router.navigate(["new-article"], { relativeTo: this.route });
  }
}
