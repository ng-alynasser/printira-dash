import { CommonModule, TitleCasePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { LayoutModule } from "../dashboard/layout";
import {
  NbActionsModule,
  NbAlertModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbSelectModule,
  NbSpinnerModule,
  NbToggleModule,
} from "@nebular/theme";
import { MomentModule } from "ngx-moment";
import { ActiveStatusDirective } from "./directives/active-status.directive";
import { PhoneNumberPipe } from "./pipes/phone-number.pipe";
import { RoleDirective } from "./directives/role.directive";
import { StringToDotsPipe } from "./pipes/string-dots.pipe";
import { RoleTitlePipe } from "./pipes/role.pipe";
import { EmailValidatorDirective } from "./directives/valid-email.directive";
import { PhoneValidationDirective } from "./directives/valid-phone.directive";

const NB_MODULES = [
  NbBadgeModule,
  NbCardModule,
  NbIconModule,
  NbAlertModule,
  NbToggleModule,
  NbInputModule,
  NbButtonModule,
  NbActionsModule,
  NbListModule,
  NbSelectModule,
  NbLayoutModule,
  NbSpinnerModule,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MomentModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NB_MODULES,
  ],
  declarations: [
    ActiveStatusDirective,
    PhoneNumberPipe,
    RoleDirective,
    StringToDotsPipe,
    RoleTitlePipe,
    EmailValidatorDirective,
    PhoneValidationDirective,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    TranslateModule,
    LayoutModule,
    ActiveStatusDirective,
    PhoneNumberPipe,
    TitleCasePipe,
    RoleDirective,
    StringToDotsPipe,
    RoleTitlePipe,
    EmailValidatorDirective,
    PhoneValidationDirective,
    ...NB_MODULES,
  ],
  providers: [TitleCasePipe],
})
export class SharedModule {}
