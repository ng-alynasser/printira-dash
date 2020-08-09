import {
  Option,
  PaginatorInput,
  FilterOptionInput_Board,
} from "src/app/common/generated-types";
import { BehaviorSubject, Observable, of } from "rxjs";
import { OptionsService } from "../../options.service";
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { tap, catchError } from "rxjs/operators";

export class OptionsDataSource implements DataSource<Option> {
  private optionsSubject = new BehaviorSubject([]);
  private totalCountSubject = new BehaviorSubject({});
  private loadingSubject = new BehaviorSubject(false);

  public loading$ = this.loadingSubject.asObservable();
  public totalCount$ = this.totalCountSubject.asObservable();

  constructor(private readonly optionsService: OptionsService) {}

  connect(collectionViewer: CollectionViewer): Observable<Option[]> {
    return this.optionsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.optionsSubject.complete();
    this.loadingSubject.complete();
    this.totalCountSubject.complete();
  }

  loadOptions(
    paginate?: PaginatorInput,
    filter?: FilterOptionInput_Board,
    sort?: string
  ) {
    this.loadingSubject.next(true);
    this.optionsService
      .getAll(paginate, filter, sort)
      .pipe(
        tap((response) => {
          this.loadingSubject.next(false);
          this.totalCountSubject.next(response.pageInfo.totalCount);
          this.optionsSubject.next(response.options);
        }),
        catchError(() => of([]))
      )
      .subscribe();
  }
}
