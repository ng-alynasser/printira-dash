import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  OnDestroy,
} from "@angular/core";
import {
  NB_AUTH_OPTIONS,
  NbAuthService,
  NbLoginComponent,
  NbAuthOptions,
} from "@nebular/auth";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { tap, finalize, take } from "rxjs/operators";
import { AuthService } from "../auth.service";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";
import { NotificationService } from "src/app/core/services/notification.service";
import { UserTypeEnum, RolesGroupEnum } from "src/app/common/generated-types";

@AutoUnsubscribe()
@Component({
  templateUrl: "login.component.html",
  styleUrls: ["login.component.scss"],
})
export class LoginComponent extends NbLoginComponent
  implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loading = false;
  isLoggedIn$: Observable<boolean>;
  errors: any = [];
  private returnUrl: string;

  constructor(
    service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) options: NbAuthOptions,
    cd: ChangeDetectorRef,
    public router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private notify: NotificationService,
    private fb: FormBuilder
  ) {
    super(service, options, cd, router);
  }

  ngOnInit(): void {
    this.initLoginForm();
    this.route.queryParams.subscribe((params) => {
      this.returnUrl = params.returnUrl || "/";
    });
  }

  ngOnDestroy(): void {
    this.loading = false;
  }

  initLoginForm(): void {
    this.loginForm = this.fb.group(
      {
        email: [
          "",
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.minLength(3),
            Validators.maxLength(320),
          ]),
        ],
        password: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        rememberMe: [false],
      },
      {
        updateOn: "blur",
      }
    );
  }

  submit(): void {
    const controls = this.loginForm.controls;

    if (this.loginForm.invalid) {
      Object.keys(controls).forEach((controlName) => {
        controls[controlName].markAllAsTouched();
      });

      return;
    }

    this.loading = true;

    this.authService
      .login(this.loginForm.value)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cd.markForCheck();
        })
      )
      .subscribe({
        next: (user) => {
          if (user && user.type === UserTypeEnum.USER && user.role) {
            this.notify.success(`Welcome back, ${user.fName}`);
            setTimeout(() => this.router.navigateByUrl(this.returnUrl), 1500);
          } else if (
            user &&
            (user.type === UserTypeEnum.DESIGNER ||
              user.type === UserTypeEnum.VENDOR)
          ) {
            this.notify.info(`Sorry, You're not authorized to access`);
          } else {
            this.notify.info(`Invalid credentials`);
          }
        },
        error: (err) => {
          this.notify.error("Something went wrong");
        },
      });
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.loginForm.controls[controlName];

    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);

    return result;
  }
}
