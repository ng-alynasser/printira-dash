import { DataSource } from "@angular/cdk/table";
import {
  StaticValue,
  PaginatorInput,
  StaticKeyEnum,
  FilterStaticValueInput_Board,
} from "src/app/common/generated-types";
import { BehaviorSubject, Observable, of } from "rxjs";
import { CollectionViewer } from "@angular/cdk/collections";
import { ArticlesService } from "../../articles.service";
import { tap, catchError } from "rxjs/operators";

export class ArticlesDataSource implements DataSource<StaticValue> {
  private articlesSubject = new BehaviorSubject<StaticValue[]>([]);
  private totalCountSubject = new BehaviorSubject<number>(0);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public totalCount$ = this.totalCountSubject.asObservable();

  constructor(private readonly articlesService: ArticlesService) {}

  connect(collectionViewer: CollectionViewer): Observable<StaticValue[]> {
    return this.articlesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.articlesSubject.complete();
    this.loadingSubject.complete();
    this.totalCountSubject.complete();
  }

  loadArticles(
    paginate: PaginatorInput,
    filter: FilterStaticValueInput_Board,
    sort?: string
  ) {
    this.loadingSubject.next(true);
    this.articlesService
      .getAll({ key: StaticKeyEnum.ARTICLES }, paginate, filter, sort)
      .pipe(
        tap((response) => {
          console.log(`SS`);
          this.loadingSubject.next(false);
          this.totalCountSubject.next(response.pageInfo.totalCount);
          this.articlesSubject.next(response.staticValues);
        }),
        catchError(() => of([]))
      )
      .subscribe();
  }
}
