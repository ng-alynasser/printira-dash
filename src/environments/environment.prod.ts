import { enableProdMode } from "@angular/core";

enableProdMode();

export const environment = {
  production: true,
  GRAPQHL_API_ENDPOINT: "http://backend.tjarb.com/graphql",
  baseHref: "/",
};
