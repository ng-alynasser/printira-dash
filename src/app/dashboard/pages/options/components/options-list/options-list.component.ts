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
import { OptionsDataSource } from "./options-datasource";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Router, ActivatedRoute } from "@angular/router";
import { OptionsService } from "../../options.service";
import { fromEvent, merge } from "rxjs";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { Option } from "src/app/common/generated-types";

@AutoUnsubscribe()
@Component({
  templateUrl: "./options-list.component.html",
  styleUrls: ["./options-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class OptionsListComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = [
    "thumbnail",
    "nameAr",
    "nameEn",
    "optionSet",
    "activated",
    "createdAt",
    "actions",
  ];

  dataSource: OptionsDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("searchInput") searchInput: ElementRef;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly optionsService: OptionsService
  ) {}

  ngOnInit(): void {
    this.dataSource = new OptionsDataSource(this.optionsService);
    this.dataSource.loadOptions({ page: 1 }, { searchKey: "" }, "createdAt");
  }

  loadOptionsPage(): void {
    this.dataSource.loadOptions(
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
          this.loadOptionsPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadOptionsPage()))
      .subscribe();
  }

  ngOnDestroy(): void {}

  showEdit(row: Option): void {
    this.router.navigate(["edit-option", row.id], {
      relativeTo: this.route,
    });
  }

  newOption(): void {
    this.router.navigate(["new-option"], { relativeTo: this.route });
  }
}
