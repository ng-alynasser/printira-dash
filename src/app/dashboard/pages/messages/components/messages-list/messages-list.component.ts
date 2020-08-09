import {
  Component,
  ViewEncapsulation,
  OnDestroy,
  AfterViewInit,
  ViewChild,
} from "@angular/core";
import { MessagesService } from "../../messages.service";
import { Subject, merge, of } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { Message } from "src/app/common/generated-types";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Router, ActivatedRoute } from "@angular/router";
import {
  startWith,
  delay,
  switchMap,
  tap,
  retry,
  catchError,
  filter,
  map,
  distinctUntilChanged,
  debounceTime,
} from "rxjs/operators";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";

@AutoUnsubscribe()
@Component({
  templateUrl: "./messages-list.component.html",
  styleUrls: ["./messages-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class MessagesListComponent implements OnDestroy, AfterViewInit {
  loading: boolean;
  private filterDebouncer$: Subject<string>;

  displayedColumns: string[];
  dataSource: MatTableDataSource<Message>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private readonly messagesService: MessagesService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.displayedColumns = [
      "name",
      "email",
      "phone",
      "address",
      "createdAt",
      "actions",
    ];
    this.dataSource = new MatTableDataSource();
    this.loading = true;
    this.filterDebouncer$ = new Subject<string>();
    this.setupFilterDebouncer();
    this.messagesService.getAll({ page: 1 }, { searchKey: "" }, "id");
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        delay(0),
        switchMap(() => {
          this.loading = true;
          return this.messagesService.getAll(
            {
              page: this.paginator.pageIndex + 1,
            },
            { searchKey: "" },
            this.sort.active || "createdAt"
          );
        }),
        retry(1),
        catchError(() => of([]))
      )
      .subscribe((messages) => {
        this.loading = false;
        this.dataSource.data = messages;
      });
  }

  ngOnDestroy(): void {}

  showEdit(row: Message): void {
    this.router.navigate(["..", row.id], {
      relativeTo: this.route,
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterDebouncer$.next(filterValue);
  }

  private setupFilterDebouncer(): void {
    this.filterDebouncer$
      .pipe(
        filter((keyword) => !!keyword),
        map((keyword) => (keyword ? keyword.trim().toLowerCase() : "")),
        distinctUntilChanged(),
        debounceTime(500),
        switchMap((keyword) => {
          this.loading = true;
          return this.messagesService.getAll({}, { searchKey: keyword });
        }),
        tap((messages) => {
          this.loading = false;
          this.paginator.pageIndex = 0;
          this.dataSource.data = messages;
        })
      )
      .subscribe();
  }
}
