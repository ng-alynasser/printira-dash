import {
  Component,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
  ChangeDetectionStrategy,
} from "@angular/core";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { Router, ActivatedRoute } from "@angular/router";
import { NotificationService } from "src/app/core/services/notification.service";
import { RolesService } from "../../roles.service";
import { RolesDataSource } from "../roles-list/roles-datasource";
import { FormGroup } from "@angular/forms";

@AutoUnsubscribe()
@Component({
  templateUrl: "./roles-editor.component.html",
  styleUrls: ["./roles-editor.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RolesEditorComponent implements OnInit, OnDestroy {
  userPermissions: string[];
  staticPermissions: string[];
  contactMessagePermissions: string[];
  artPermissions: string[];
  categoryPermissions: string[];
  subCategoryPermissions: string[];
  designerPermissions: string[];
  optionPermissions: string[];
  productPermissions: string[];
  reviewPermissions: string[];
  vendorPermissions: string[];
  mockupPermissions: string[];
  rolePermissions: string[];
  newsLetterPermissions: string[];
  selectedPermissions: string[];
  dataSource: RolesDataSource;

  roleEditorForm: FormGroup;
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly notify: NotificationService,
    private readonly rolesService: RolesService
  ) {}

  ngOnInit() {
    const roleId = this.route.snapshot.paramMap.get("slug");
    this.rolesService.roleById(roleId).subscribe((_) => console.log(_));
  }

  private initRoleForm() {
    // this.roleEditorForm = new FormGroup({
    // })
  }

  ngOnDestroy(): void {}
}
