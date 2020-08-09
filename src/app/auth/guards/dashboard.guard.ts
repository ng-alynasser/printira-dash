import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";
import { map } from "rxjs/operators";
import { UserTypeEnum, RolesGroupEnum } from "src/app/common/generated-types";

@Injectable({ providedIn: "root" })
export class DashboardGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.getUserByToken().pipe(
      map((user) => {
        if (user && user.type === UserTypeEnum.USER && user.role) {
          return true;
        } else {
          this.router.navigateByUrl("/auth/login");
          return false;
        }
      })
    );
  }
}
