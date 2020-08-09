import { DataSource } from "@angular/cdk/table";
import {
  PaginatorInput,
  FilterStaticInput_Board,
  StaticValue,
} from "src/app/common/generated-types";
import { BehaviorSubject, Observable, of } from "rxjs";
import { CollectionViewer } from "@angular/cdk/collections";
import { FaqService } from "../../faq.service";
import { tap, catchError } from "rxjs/operators";

export class FaqDataSource implements DataSource<StaticValue> {
  private faqsSubject = new BehaviorSubject([]);
  private totalCountSubject = new BehaviorSubject({});
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public totalCount$ = this.totalCountSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  constructor(private readonly faqsService: FaqService) {}

  connect(collectionViewer: CollectionViewer): Observable<StaticValue[]> {
    return this.faqsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.faqsSubject.complete();
    this.loadingSubject.complete();
    this.totalCountSubject.complete();
  }

  loadFaqs(
    paginate: PaginatorInput,
    filter?: FilterStaticInput_Board,
    sort?: string
  ) {
    this.loadingSubject.next(true);
    this.faqsService
      .getFaqs(paginate, filter, sort)
      .pipe(
        tap((response) => {
          this.loadingSubject.next(false);
          this.totalCountSubject.next(response.pageInfo.totalCount);
          this.faqsSubject.next(response.statics[0].values);
        }),
        catchError(() => of([]))
      )
      .subscribe();
  }
}
