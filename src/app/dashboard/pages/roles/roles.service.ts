import { Injectable } from "@angular/core";
import {
  RolesGQL,
  PaginatorInput,
  RoleFilterInput,
  RoleByIdGQL,
  UpdatePermissionsGQL,
  UpdateRoleInput,
} from "src/app/common/generated-types";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class RolesService {
  constructor(
    private readonly rolesGQL: RolesGQL,
    private readonly roleByIdGQL: RoleByIdGQL,
    private readonly updatePermissionsGQL: UpdatePermissionsGQL
  ) {}

  getAll(paginate?: PaginatorInput, filter?: RoleFilterInput, sort?: string) {
    return this.rolesGQL
      .watch({
        paginate,
        filter,
        sort,
      })
      .valueChanges.pipe(map((response) => response.data.roles_board.data));
  }

  roleById(roleId: string) {
    return this.roleByIdGQL
      .watch({ roleId })
      .valueChanges.pipe(map((response) => response.data.findRoleById.role));
  }

  updatePermissions(roleId: string, input: UpdateRoleInput) {
    return this.updatePermissionsGQL
      .mutate({ roleId, input })
      .pipe(map((response) => response.data.updateRolePermissions));
  }
}
