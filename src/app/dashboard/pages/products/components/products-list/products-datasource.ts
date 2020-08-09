import { DataSource } from "@angular/cdk/table";
import {
  PaginatorInput,
  FilterProductInput_Board,
  Product,
} from "src/app/common/generated-types";
import { BehaviorSubject, Observable, of } from "rxjs";
import { CollectionViewer } from "@angular/cdk/collections";
import { ProductsService } from "../../products.service";
import { tap, catchError } from "rxjs/operators";

export class ProductsDataSource implements DataSource<Product> {
  private productsSubject = new BehaviorSubject([]);
  private totalCountSubject = new BehaviorSubject({});
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public totalCount$ = this.totalCountSubject.asObservable();

  constructor(private readonly productsService: ProductsService) {}

  connect(collectionViewer: CollectionViewer): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.productsSubject.complete();
    this.loadingSubject.complete();
    this.totalCountSubject.complete();
  }

  loadProducts(
    paginate: PaginatorInput,
    filter: FilterProductInput_Board,
    sort?: string
  ) {
    this.loadingSubject.next(true);
    this.productsService
      .getAll(paginate, filter, sort)
      .pipe(
        tap((response) => {
          this.loadingSubject.next(false);
          this.totalCountSubject.next(response.data.pageInfo.totalCount);
          this.productsSubject.next(response.data.products);
        }),
        catchError(() => of([]))
      )
      .subscribe();
  }
}
