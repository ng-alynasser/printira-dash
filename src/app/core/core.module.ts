import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from "@angular/core";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { APP_BASE_HREF } from "@angular/common";
import { NbAuthModule } from "@nebular/auth";
import { NbSecurityModule } from "@nebular/security";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { BrowserModule } from "@angular/platform-browser";
import { DefaultInterceptor } from "./services/interceptor.service";
import { environment } from "src/environments/environment";
import { InMemoryCache } from "apollo-cache-inmemory";
import { AuthInterceptor } from "./services/auth-interceptor.service";
import { SharedModule } from "../shared/shared.module";
import { DefaultOptions } from "apollo-client";

export const NB_CORE_PROVIDERS = [
  NbSecurityModule.forRoot().providers,
  NbAuthModule.forRoot().providers,
];

@NgModule({
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    SharedModule,
    BrowserModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DefaultInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: APP_BASE_HREF,
      useValue: environment.baseHref,
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory: apolloOptionsFactory,
      deps: [HttpLink],
    },
  ],
  exports: [NbAuthModule, NbSecurityModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error("You should import core module only in the root module");
    }
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...NB_CORE_PROVIDERS],
    } as ModuleWithProviders;
  }
}

export function apolloOptionsFactory(httpLink: HttpLink) {
  const { GRAPQHL_API_ENDPOINT } = environment;
  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
  };

  const result = {
    link: httpLink.create({
      uri: GRAPQHL_API_ENDPOINT,
      useMultipart: true,
    }),
    cache: new InMemoryCache(),
    defaultOptions,
  };

  return result;
}
