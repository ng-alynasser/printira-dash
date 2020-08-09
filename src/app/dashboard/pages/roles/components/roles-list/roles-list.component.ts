import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { RolesDataSource } from "./roles-datasource";
import { MatPaginator } from "@angular/material/paginator";
import { Router, ActivatedRoute } from "@angular/router";
import { RolesService } from "../../roles.service";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { Role } from "src/app/common/generated-types";

@AutoUnsubscribe()
@Component({
  templateUrl: "./roles-list.component.html",
  styleUrls: ["./roles-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class RolesListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ["group", "description", "actions"];

  dataSource: RolesDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly rolesService: RolesService
  ) {}

  ngOnInit(): void {
    this.dataSource = new RolesDataSource(this.rolesService);
    this.dataSource.loadRoles({ page: 1 });
  }

  ngOnDestroy(): void {}

  loadRolesPage(): void {
    this.dataSource.loadRoles({ page: this.paginator.pageIndex + 1 }, {});
  }

  showEdit(row: Role) {
    // this.router.navigate(["edit-role", row.id], {
    //   relativeTo: this.route,
    // });
  }
}
