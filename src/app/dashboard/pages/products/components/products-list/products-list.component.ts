import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ViewEncapsulation,
} from "@angular/core";
import { fromEvent, merge } from "rxjs";
import { Product } from "src/app/common/generated-types";
import { ProductsService } from "../../products.service";
import { ProductsDataSource } from "./products-datasource";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Router, ActivatedRoute } from "@angular/router";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";

@AutoUnsubscribe()
@Component({
  templateUrl: "./products-list.component.html",
  styleUrls: ["./products-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ProductsListComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = [
    "thumbnails",
    "sku",
    "nameAr",
    "nameEn",
    "subCategory",
    "mockup",
    "art",
    "activated",
    "createdAt",
    "actions",
  ];

  dataSource: ProductsDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("searchInput") searchInput: ElementRef;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.dataSource = new ProductsDataSource(this.productsService);
    this.dataSource.loadProducts({ page: 1 }, { searchKey: "" }, "createdAt");
  }

  loadProductsPage(): void {
    this.dataSource.loadProducts(
      {
        page: this.paginator.pageIndex + 1,
      },
      {
        searchKey: this.searchInput.nativeElement.value,
      },
      this.sort.active
    );
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    fromEvent(this.searchInput.nativeElement, "keyup")
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadProductsPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadProductsPage()))
      .subscribe();
  }

  ngOnDestroy(): void {}

  showEdit(row: Product): void {
    this.router.navigate(["edit-product", row.id], {
      relativeTo: this.route,
    });
  }

  newProduct(): void {
    this.router.navigate(["new-product"], { relativeTo: this.route });
  }
}
