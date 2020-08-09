import {
  Component,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { ArtsDataSource } from "./arts-datasource";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Router, ActivatedRoute } from "@angular/router";
import { ArtsService } from "../../arts.service";
import { fromEvent, merge } from "rxjs";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { Art } from "src/app/common/generated-types";

@Component({
  templateUrl: "./arts-list.component.html",
  styleUrls: ["./arts-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ArtsListComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = [
    "avatar",
    "nameAr",
    "nameEn",
    "designer",
    "products",
    "createdAt",
    "actions",
  ];

  dataSource: ArtsDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("searchInput") searchInput: ElementRef;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly artsService: ArtsService
  ) {}

  ngOnInit(): void {
    this.dataSource = new ArtsDataSource(this.artsService);
    this.dataSource.loadArts({ page: 1 }, { searchKey: "" }, "createdAt");
  }

  loadArtsPage(): void {
    this.dataSource.loadArts(
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
          this.loadArtsPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadArtsPage()))
      .subscribe();
  }

  ngOnDestroy(): void {}

  showEdit(row: Art): void {
    this.router.navigate(["..", "edit-art", row.id], {
      relativeTo: this.route,
    });
  }

  newArt(): void {
    this.router.navigate(["new-art"], { relativeTo: this.route });
  }
}
