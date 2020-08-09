import { DataSource } from "@angular/cdk/table";
import {
  User,
  PaginatorInput,
  FilterUserInput_Board,
} from "src/app/common/generated-types";
import { BehaviorSubject, Observable, of } from "rxjs";
import { CollectionViewer } from "@angular/cdk/collections";
import { catchError, tap } from "rxjs/operators";
import { UsersService } from "../../users.service";

export class UsersDataSource implements DataSource<User> {
  private usersSubject = new BehaviorSubject<Partial<User[]>>([]);
  private totalCountSubject = new BehaviorSubject({});
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public totalCount$ = this.totalCountSubject.asObservable();

  constructor(private usersService: UsersService) {}

  connect(collectionViewer: CollectionViewer): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.usersSubject.complete();
    this.loadingSubject.complete();
    this.totalCountSubject.complete();
  }

  loadUsers(
    paginate: PaginatorInput,
    filter: FilterUserInput_Board,
    sort?: string
  ) {
    this.loadingSubject.next(true);
    this.usersService
      .getAll(paginate, filter, sort)
      .pipe(
        tap((response) => {
          this.loadingSubject.next(false);
          this.totalCountSubject.next(response.pageInfo.totalCount);
          this.usersSubject.next(response.users);
        }),
        catchError(() => of([]))
      )
      .subscribe();
  }
}
