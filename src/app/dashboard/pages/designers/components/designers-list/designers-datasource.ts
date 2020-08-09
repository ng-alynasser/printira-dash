import { DataSource } from "@angular/cdk/table";
import {
  PaginatorInput,
  Designer,
  FilterDesignerInput_Board,
} from "src/app/common/generated-types";
import { BehaviorSubject, Observable, of } from "rxjs";
import { CollectionViewer } from "@angular/cdk/collections";
import { catchError, tap } from "rxjs/operators";
import { DesignersService } from "../../designers.service";

export class DesignersDataSource implements DataSource<Designer> {
  private usersSubject = new BehaviorSubject<Designer[]>([]);
  private totalCountSubject = new BehaviorSubject({});
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public totalCount$ = this.totalCountSubject.asObservable();

  constructor(private designersService: DesignersService) {}

  connect(collectionViewer: CollectionViewer): Observable<Designer[]> {
    return this.usersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.usersSubject.complete();
    this.loadingSubject.complete();
    this.totalCountSubject.complete();
  }

  loadDesigners(
    paginate: PaginatorInput,
    filter: FilterDesignerInput_Board,
    sort?: string
  ) {
    this.loadingSubject.next(true);
    this.designersService
      .getAll(paginate, filter, sort)
      .pipe(
        tap((response) => {
          this.loadingSubject.next(false);
          this.totalCountSubject.next(response.pageInfo.totalCount);
          this.usersSubject.next(response.designers);
        }),
        catchError(() => of([]))
      )
      .subscribe();
  }
}
