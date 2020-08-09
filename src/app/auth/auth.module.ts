import { NgModule } from "@angular/core";
import { AuthRoutingModule } from "./auth-routing.module";
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbSpinnerModule
} from "@nebular/theme";
import { NbAuthModule } from "@nebular/auth";

import { NbAuthComponent } from "./auth.component";
import { LoginComponent } from "./login/login.component";
import { RequestPasswordComponent } from "./request-password/request-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    NbAuthComponent,
    LoginComponent
    // RequestPasswordComponent,
    // ResetPasswordComponent,
  ],
  imports: [
    NbAlertModule,
    NbInputModule,
    NbCheckboxModule,
    NbButtonModule,
    NbAuthModule,
    NbSpinnerModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule {}
