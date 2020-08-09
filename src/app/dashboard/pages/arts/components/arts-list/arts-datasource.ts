import { DataSource } from "@angular/cdk/table";
import {
  Art,
  PaginatorInput,
  FilterArtInput_Board,
} from "src/app/common/generated-types";
import { BehaviorSubject, Observable, of } from "rxjs";
import { ArtsService } from "../../arts.service";
import { CollectionViewer } from "@angular/cdk/collections";
import { tap, catchError } from "rxjs/operators";

export class ArtsDataSource implements DataSource<Art> {
  private artsSubject = new BehaviorSubject([]);
  private totalCountSubject = new BehaviorSubject({});
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public totalCount$ = this.totalCountSubject.asObservable();

  constructor(private readonly artsService: ArtsService) {}

  connect(collectionViewer: CollectionViewer): Observable<Art[]> {
    return this.artsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.artsSubject.complete();
    this.loadingSubject.complete();
    this.totalCountSubject.complete();
  }

  loadArts(
    paginate: PaginatorInput,
    filter: FilterArtInput_Board,
    sort?: string
  ) {
    this.loadingSubject.next(true);
    this.artsService
      .getAll(paginate, filter, sort)
      .pipe(
        tap((response) => {
          this.loadingSubject.next(false);
          this.totalCountSubject.next(response.data.pageInfo.totalCount);
          this.artsSubject.next(response.data.arts);
        }),
        catchError(() => of([]))
      )
      .subscribe();
  }
}
