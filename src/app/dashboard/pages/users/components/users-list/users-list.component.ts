import {
  Component,
  ViewEncapsulation,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  ElementRef,
  OnInit,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { UsersService } from "../../users.service";
import { merge, fromEvent } from "rxjs";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { tap, debounceTime, distinctUntilChanged } from "rxjs/operators";
import { User, UserTypeEnum } from "src/app/common/generated-types";
import { UsersDataSource } from "./users-datasource";
@AutoUnsubscribe()
@Component({
  selector: "app-users-list",
  templateUrl: "users-list.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class UsersListComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = [
    "avatar",
    "fName",
    "lName",
    "email",
    "role",
    "gender",
    "activated",
    "lastLoginAt",
    "actions",
  ];
  dataSource: UsersDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("searchInput") searchInput: ElementRef;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.dataSource = new UsersDataSource(this.usersService);
    this.dataSource.loadUsers(
      {
        page: 1,
      },
      {
        type: UserTypeEnum.USER,
      },
      "createdAt"
    );
  }

  loadUsersPage(): void {
    this.dataSource.loadUsers(
      {
        page: this.paginator.pageIndex + 1,
      },
      {
        searchKey: this.searchInput.nativeElement.value,
        type: UserTypeEnum.USER,
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
          this.loadUsersPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadUsersPage()))
      .subscribe();
  }

  ngOnDestroy(): void {}

  showEdit(row: User) {
    this.router.navigate(["..", "edit-user", row.id], {
      relativeTo: this.route,
    });
  }

  newUser() {
    this.router.navigate(["new-user"], { relativeTo: this.route });
  }
}
