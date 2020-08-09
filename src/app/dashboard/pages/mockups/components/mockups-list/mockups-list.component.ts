import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit,
  ViewEncapsulation,
} from "@angular/core";
import { MockupsDataSource } from "./mockups-datasource";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute, Router } from "@angular/router";
import { fromEvent, merge } from "rxjs";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { Product } from "src/app/common/generated-types";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { MockupService } from "../../mockup.service";

@AutoUnsubscribe()
@Component({
  templateUrl: "./mockups-list.component.html",
  styleUrls: ["./mockups-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MockupsListComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = [
    "thumbnails",
    "sku",
    "nameAr",
    "nameEn",
    "subCategory",
    "activated",
    "createdAt",
    "actions",
  ];

  dataSource: MockupsDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("searchInput") searchInput: ElementRef;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly mockupService: MockupService
  ) {}

  ngOnInit(): void {
    this.dataSource = new MockupsDataSource(this.mockupService);
    this.dataSource.loadMockups({ page: 1 }, { searchKey: "" }, "createdAt");
  }

  ngOnDestroy(): void {}

  loadMockupsPage(): void {
    this.dataSource.loadMockups(
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
          this.loadMockupsPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadMockupsPage()))
      .subscribe();
  }

  showEdit(row: Product): void {
    this.router.navigate(["/dashboard/mockups/edit-mockup", row.id]);
  }

  newMockup(): void {
    this.router.navigate(["new-mockup"], { relativeTo: this.route });
  }
}
