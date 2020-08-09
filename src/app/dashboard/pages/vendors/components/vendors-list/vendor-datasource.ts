import { DataSource } from "@angular/cdk/table";
import {
  PaginatorInput,
  Vendor,
  FilterVendorInput_Board,
} from "src/app/common/generated-types";
import { BehaviorSubject, Observable, of } from "rxjs";
import { VendorsService } from "../../vendors.service";
import { CollectionViewer } from "@angular/cdk/collections";
import { catchError, tap } from "rxjs/operators";

export class VendorsDataSource implements DataSource<Vendor> {
  private vendorsSubject = new BehaviorSubject<Vendor[]>([]);
  private totalCountSubject = new BehaviorSubject({});
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public totalCount$ = this.totalCountSubject.asObservable();

  constructor(private vendorsService: VendorsService) {}

  connect(collectionViewer: CollectionViewer): Observable<Vendor[]> {
    return this.vendorsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.vendorsSubject.complete();
    this.loadingSubject.complete();
    this.totalCountSubject.complete();
  }

  loadVendors(
    paginate: PaginatorInput,
    filter: FilterVendorInput_Board,
    sort?: string
  ) {
    this.loadingSubject.next(true);
    this.vendorsService
      .getAll(paginate, filter, sort)
      .pipe(
        tap((response) => {
          this.loadingSubject.next(false);
          this.totalCountSubject.next(response.pageInfo.totalCount);
          this.vendorsSubject.next(response.vendors);
        }),
        catchError(() => of([]))
      )
      .subscribe();
  }
}
