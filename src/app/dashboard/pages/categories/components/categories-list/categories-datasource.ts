import { DataSource } from "@angular/cdk/table";
import {
  Category,
  PaginatorInput,
  FilterCategoryInput_Board,
} from "src/app/common/generated-types";
import { BehaviorSubject, Observable, of } from "rxjs";
import { CategoriesService } from "../../category.service";
import { CollectionViewer } from "@angular/cdk/collections";
import { tap, catchError } from "rxjs/operators";

export class CategoriesDataSource implements DataSource<Category> {
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  private totalCountSubject = new BehaviorSubject<number>(0);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public totalCount$ = this.totalCountSubject.asObservable();

  constructor(private readonly categoriesService: CategoriesService) {}

  connect(collectionViewer: CollectionViewer): Observable<Category[]> {
    return this.categoriesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.categoriesSubject.complete();
    this.loadingSubject.complete();
    this.totalCountSubject.complete();
  }

  loadCategories(
    paginate: PaginatorInput,
    filter: FilterCategoryInput_Board,
    sort?: string
  ) {
    this.loadingSubject.next(true);
    this.categoriesService
      .getMainCategories(paginate, filter, sort)
      .pipe(
        tap((response) => {
          this.loadingSubject.next(false);
          this.totalCountSubject.next(response.pageInfo.totalCount);
          this.categoriesSubject.next(response.categories);
        }),
        catchError(() => of([]))
      )
      .subscribe();
  }
}
