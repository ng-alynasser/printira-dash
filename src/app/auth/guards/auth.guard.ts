import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.getUserByToken().pipe(
      map((user) => {
        if (user) {
          this.router.navigateByUrl("/dashboard");
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
