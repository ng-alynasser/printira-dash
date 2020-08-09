import {
  Component,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Router, ActivatedRoute } from "@angular/router";
import { Designer } from "src/app/common/generated-types";
import { fromEvent, merge } from "rxjs";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { DesignersDataSource } from "./designers-datasource";
import { DesignersService } from "../../designers.service";

@Component({
  templateUrl: "./designers-list.component.html",
  styleUrls: ["./designers-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DesignersListComponent
  implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = [
    "avatar",
    "nameAr",
    "nameEn",
    "email",
    "activated",
    "lastLoginAt",
    "actions",
  ];
  dataSource: DesignersDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("searchInput") searchInput: ElementRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private designersService: DesignersService
  ) {}

  ngOnInit(): void {
    this.dataSource = new DesignersDataSource(this.designersService);
    this.dataSource.loadDesigners(
      { page: 1, limit: 16 },
      { searchKey: "" },
      "createdAt"
    );
  }

  loadDesignersPage(): void {
    this.dataSource.loadDesigners(
      {
        page: this.paginator.pageIndex + 1,
      },
      {
        searchKey: this.searchInput.nativeElement.value,
      },
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
          this.loadDesignersPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadDesignersPage()))
      .subscribe();
  }

  ngOnDestroy(): void {}

  showEdit(row: Designer) {
    this.router.navigate(["..", "edit-designer", row.id], {
      relativeTo: this.activatedRoute,
    });
  }

  newDesigner() {
    this.router.navigate(["new-designer"], { relativeTo: this.activatedRoute });
  }
}
