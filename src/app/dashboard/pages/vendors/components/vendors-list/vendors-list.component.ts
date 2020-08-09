import {
  Component,
  ViewChild,
  OnDestroy,
  AfterViewInit,
  ViewEncapsulation,
  OnInit,
  ElementRef,
} from "@angular/core";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { merge, fromEvent } from "rxjs";
import { Vendor } from "src/app/common/generated-types";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { ActivatedRoute, Router } from "@angular/router";
import { VendorsService } from "../../vendors.service";
import { tap, distinctUntilChanged, debounceTime } from "rxjs/operators";
import { VendorsDataSource } from "./vendor-datasource";

@AutoUnsubscribe()
@Component({
  templateUrl: "./vendors-list.component.html",
  styleUrls: ["./vendors-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class VendorsListComponent implements OnDestroy, AfterViewInit, OnInit {
  displayedColumns: string[] = [
    "avatar",
    "nameAr",
    "nameEn",
    "email",
    "phone",
    "activated",
    "lastLoginAt",
    "actions",
  ];

  dataSource: VendorsDataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("searchInput") searchInput: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vendorsService: VendorsService
  ) {}

  ngOnInit(): void {
    this.dataSource = new VendorsDataSource(this.vendorsService);
    this.dataSource.loadVendors(
      {
        page: 1,
        limit: 16,
      },
      {
        searchKey: "",
      },
      "createdAt"
    );
  }

  loadVendorsPage(): void {
    this.dataSource.loadVendors(
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
          this.loadVendorsPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadVendorsPage()))
      .subscribe();
  }

  ngOnDestroy(): void {}

  showEdit(row: Vendor) {
    this.router.navigate(["..", "edit-vendor", row.user.id], {
      relativeTo: this.route,
    });
  }

  newVendor() {
    this.router.navigate(["new-vendor"], { relativeTo: this.route });
  }
}
