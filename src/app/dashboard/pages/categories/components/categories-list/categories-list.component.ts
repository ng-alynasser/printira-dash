import {
  Component,
  ViewEncapsulation,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnInit,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { CategoriesService } from "../../category.service";
import { merge, fromEvent } from "rxjs";
import { distinctUntilChanged, debounceTime, tap } from "rxjs/operators";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { Category } from "src/app/common/generated-types";
import { CategoriesDataSource } from "./categories-datasource";
@AutoUnsubscribe()
@Component({
  selector: "app-categories-list",
  templateUrl: "categories-list.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class CategoriesListComponent
  implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = [
    "thumbnail",
    "nameAr",
    "nameEn",
    "products",
    "activated",
    "createdAt",
    "actions",
  ];

  dataSource: CategoriesDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("searchInput") searchInput: ElementRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.dataSource = new CategoriesDataSource(this.categoriesService);
    this.dataSource.loadCategories({ page: 1 }, { searchKey: "" }, "createdAt");
  }

  loadCategoriesPage(): void {
    this.dataSource.loadCategories(
      {
        page: this.paginator.pageIndex + 1,
      },
      { searchKey: this.searchInput.nativeElement.value },
      this.sort.active
    );
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    fromEvent(this.searchInput.nativeElement, "keyup")
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadCategoriesPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadCategoriesPage()))
      .subscribe();
  }

  ngOnDestroy(): void {}

  showEdit(row: Category): void {
    this.router.navigate(["edit-category", row.id], {
      relativeTo: this.activatedRoute,
    });
  }

  showPreview(row: Category): void {
    this.router.navigate([row.id], {
      relativeTo: this.activatedRoute,
    });
  }

  newCategory() {
    this.router.navigate(["new-category"], { relativeTo: this.activatedRoute });
  }
}
