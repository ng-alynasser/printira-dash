import { Injectable } from "@angular/core";
import { tap, map } from "rxjs/operators";
import { of, Observable, Subject } from "rxjs";
import { LoginGQL, GetCurrentUserGQL, User } from "src/app/common/generated-types";

@Injectable({ providedIn: "root" })
export class AuthService {

  private readonly authenticationState = new Subject<User>();

  constructor(
    private loginGQL: LoginGQL,
    private currentUserGQL: GetCurrentUserGQL
  ) {
    const savedToken = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (savedToken) {
      this.getUserByToken().subscribe(user => {
        if (user) {
          this.authenticationState.next(user);
        }
      });
    }
  }


  login({ email, password, rememberMe }) {
    return this.loginGQL.mutate({ input: { email, password } }).pipe(
      map((response) => response.data.login.user),
      tap((user) => {
        if (user) {
          this.authenticationState.next(user);
          this.setToken(user.token, rememberMe);
        }
      })
    );
  }

  logout(): Observable<boolean> {
    this.setToken(null);
    return of(true);
  }

  private setToken(token: string | null, rememberMe?: boolean): void {
    if (token) {
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
      localStorage.removeItem("token");
    }
  }

  getUserByToken() {
    const lsToken: string = localStorage.getItem("token");
    const ssToken: string = sessionStorage.getItem("token");
    const token: string | null = lsToken ? lsToken : ssToken;

    if (token) {
      return this.currentUserGQL
        .watch()
        .valueChanges.pipe(
          map((response) => response.data.getCurrentUser.user)
        );
    } else {
      return of(null);
    }
  }

  getAuthenticationState(): Observable<User> {
    return this.authenticationState.asObservable();
  }
}
