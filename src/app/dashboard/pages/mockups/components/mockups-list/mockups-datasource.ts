import { DataSource } from "@angular/cdk/table";
import {
  PaginatorInput,
  FilterProductInput_Board,
  Product,
} from "src/app/common/generated-types";
import { BehaviorSubject, Observable, of } from "rxjs";
import { CollectionViewer } from "@angular/cdk/collections";
import { tap, catchError } from "rxjs/operators";
import { MockupService } from "../../mockup.service";

export class MockupsDataSource implements DataSource<Product> {
  private mockupsSubject = new BehaviorSubject([]);
  private totalCountSubject = new BehaviorSubject({});
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public totalCount$ = this.totalCountSubject.asObservable();

  constructor(private readonly mockupService: MockupService) {}

  connect(collectionViewer: CollectionViewer): Observable<Product[]> {
    return this.mockupsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.mockupsSubject.complete();
    this.loadingSubject.complete();
    this.totalCountSubject.complete();
  }

  loadMockups(
    paginate: PaginatorInput,
    filter: FilterProductInput_Board,
    sort?: string
  ) {
    this.loadingSubject.next(true);
    this.mockupService
      .getAll(paginate, filter, sort)
      .pipe(
        tap((response) => {
          if (response) {
            this.loadingSubject.next(false);
            this.totalCountSubject.next(response.pageInfo.totalCount);
            this.mockupsSubject.next(response.mockups);
          }
        }),
        catchError(() => of([]))
      )
      .subscribe();
  }
}
