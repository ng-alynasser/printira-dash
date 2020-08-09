import { DataSource } from "@angular/cdk/table";
import {
  Role,
  PaginatorInput,
  RoleFilterInput,
} from "src/app/common/generated-types";
import { BehaviorSubject, Observable, of } from "rxjs";
import { RolesService } from "../../roles.service";
import { CollectionViewer } from "@angular/cdk/collections";
import { tap, catchError } from "rxjs/operators";

export class RolesDataSource implements DataSource<Role> {
  private rolesSubject = new BehaviorSubject([]);
  private totalCountSubject = new BehaviorSubject({});
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public totalCount$ = this.totalCountSubject.asObservable();

  constructor(private readonly rolesService: RolesService) {}

  connect(collectionViewer: CollectionViewer): Observable<Role[]> {
    return this.rolesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.rolesSubject.complete();
    this.loadingSubject.complete();
    this.totalCountSubject.complete();
  }

  loadRoles(paginate: PaginatorInput, filter?: RoleFilterInput, sort?: string) {
    this.loadingSubject.next(true);
    this.rolesService
      .getAll(paginate, filter, sort)
      .pipe(
        tap((response) => {
          this.loadingSubject.next(false);
          this.totalCountSubject.next(response.pageInfo.totalCount);
          this.rolesSubject.next(response.roles);
        }),
        catchError(() => of([]))
      )
      .subscribe();
  }
}
