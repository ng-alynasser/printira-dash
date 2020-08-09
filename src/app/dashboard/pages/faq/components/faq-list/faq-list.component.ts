import {
  Component,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
  AfterViewInit,
  ViewChild,
} from "@angular/core";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { Router, ActivatedRoute } from "@angular/router";
import { FaqService } from "../../faq.service";
import { FaqDataSource } from "./faq-datasource";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { merge } from "rxjs";
import { tap } from "rxjs/operators";
import { StaticValue } from "src/app/common/generated-types";

@AutoUnsubscribe()
@Component({
  templateUrl: "./faq-list.component.html",
  styleUrls: ["./faq-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FaqListComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = [
    "titleAr",
    "titleEn",
    "createdAt",
    "activated",
    "actions",
  ];
  dataSource: FaqDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly faqService: FaqService
  ) {}

  ngOnInit(): void {
    this.dataSource = new FaqDataSource(this.faqService);
    this.dataSource.loadFaqs({ page: 1 }, {}, "createdAt");
  }

  ngOnDestroy(): void {}

  loadFaqsPage(): void {
    this.dataSource.loadFaqs(
      { page: this.paginator.pageIndex + 1 },
      {},
      this.sort.active
    );
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadFaqsPage()))
      .subscribe();
  }

  showEdit(row: StaticValue) {
    this.router.navigate(["edit-faq", row.id], {
      relativeTo: this.route,
    });
  }

  newFaq() {
    this.router.navigate(["new-faq"], { relativeTo: this.route });
  }
}
