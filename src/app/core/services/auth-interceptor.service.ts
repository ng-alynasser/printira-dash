import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const lsToken: string | null = localStorage.getItem("token");
    const ssToken: string | null = sessionStorage.getItem("token");
    const token: string | null = lsToken ? lsToken : ssToken;

    if (token) {
      request = request.clone({
        headers: request.headers.set("Authorization", `Bearer ${token}`),
      });
    }

    return next.handle(request).pipe(map((event: HttpEvent<any>) => event));
  }
}
